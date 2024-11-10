import { HttpService } from '@nestjs/axios'
import { Inject, Injectable } from '@nestjs/common'

import { JwtService } from '@nestjs/jwt'
import Redis from 'ioredis'

import { isEmpty } from 'lodash'

import { lastValueFrom, map } from 'rxjs'
import { InjectRedis } from '~/common/decorators/inject-redis.decorator'
import { BusinessException } from '~/common/exceptions/biz.exception'

import { AppConfig, IAppConfig, ISecurityConfig, SecurityConfig } from '~/config'

import { ErrorEnum } from '~/constants/error-code.constant'

import { env } from '~/global/env'
import { genAuthPermKey, genAuthPVKey, genAuthTokenKey, genTokenBlacklistKey } from '~/helper/genRedisKey'
import { ClinetUserService } from '~/modules/client/user/user.service'
import { UserService } from '~/modules/user/user.service'
import { md5 } from '~/utils'

import { LoginLogService } from '../system/log/services/login-log.service'
import { MenuService } from '../system/menu/menu.service'
import { RoleService } from '../system/role/role.service'
import { TokenService } from './services/token.service'

@Injectable()
export class AuthService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly httpService: HttpService,
    private menuService: MenuService,
    private roleService: RoleService,
    private userService: UserService,
    private clientUserService: ClinetUserService,
    private loginLogService: LoginLogService,
    private tokenService: TokenService,
    private jwtService: JwtService,
    @Inject(SecurityConfig.KEY) private securityConfig: ISecurityConfig,
    @Inject(AppConfig.KEY) private appConfig: IAppConfig,
  ) {}

  async validateUser(credential: string, password: string): Promise<any> {
    const user = await this.userService.findUserByUserName(credential)

    if (isEmpty(user))
      throw new BusinessException(ErrorEnum.USER_NOT_FOUND)

    const comparePassword = md5(`${password}${user.psalt}`)
    if (user.password !== comparePassword)
      throw new BusinessException(ErrorEnum.INVALID_USERNAME_PASSWORD)

    if (user) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  /**
   * 获取登录JWT
   * 返回null则账号密码有误，不存在该用户
   */
  async login(
    username: string,
    password: string,
    ip: string,
    ua: string,
  ): Promise<string> {
    const user = await this.userService.findUserByUserName(username)
    if (isEmpty(user))
      throw new BusinessException(ErrorEnum.INVALID_USERNAME_PASSWORD)

    const comparePassword = md5(`${password}${user.psalt}`)
    if (user.password !== comparePassword)
      throw new BusinessException(ErrorEnum.INVALID_USERNAME_PASSWORD)

    const roleIds = await this.roleService.getRoleIdsByUser(user.id)

    const roles = await this.roleService.getRoleValues(roleIds)

    // 包含access_token和refresh_token
    const token = await this.tokenService.generateAccessToken(user.id, roles)

    await this.redis.set(genAuthTokenKey(user.id), token.accessToken, 'EX', this.securityConfig.jwtExprire)

    // 设置密码版本号 当密码修改时，版本号+1
    await this.redis.set(genAuthPVKey(user.id), 1)

    // 设置菜单权限
    const permissions = await this.menuService.getPermissions(user.id)
    await this.setPermissionsCache(user.id, permissions)

    await this.loginLogService.create(user.id, ip, ua)

    return token.accessToken
  }

  /**
   * 效验账号密码
   */
  async checkPassword(username: string, password: string) {
    const user = await this.userService.findUserByUserName(username)

    const comparePassword = md5(`${password}${user.psalt}`)
    if (user.password !== comparePassword)
      throw new BusinessException(ErrorEnum.INVALID_USERNAME_PASSWORD)
  }

  async loginLog(uid: bigint, ip: string, ua: string) {
    await this.loginLogService.create(uid, ip, ua)
  }

  /**
   * 重置密码
   */
  async resetPassword(username: string, password: string) {
    const user = await this.userService.findUserByUserName(username)

    await this.userService.forceUpdatePassword(user.id, password)
  }

  /**
   * 清除登录状态信息
   */
  async clearLoginStatus(user: IAuthUser, accessToken: string): Promise<void> {
    const exp = user.exp ? (user.exp - Date.now() / 1000).toFixed(0) : this.securityConfig.jwtExprire
    await this.redis.set(genTokenBlacklistKey(accessToken), accessToken, 'EX', exp)
    if (this.appConfig.multiDeviceLogin)
      await this.tokenService.removeAccessToken(accessToken)
    else
      await this.userService.forbidden(user.uid, accessToken)
  }

  /**
   * 获取菜单列表
   */
  async getMenus(uid: bigint) {
    return this.menuService.getMenus(uid)
  }

  /**
   * 获取权限列表
   */
  async getPermissions(uid: bigint): Promise<string[]> {
    return this.menuService.getPermissions(uid)
  }

  async getPermissionsCache(uid: bigint): Promise<string[]> {
    const permissionString = await this.redis.get(genAuthPermKey(uid))
    return permissionString ? JSON.parse(permissionString) : []
  }

  async setPermissionsCache(uid: bigint, permissions: string[]): Promise<void> {
    await this.redis.set(genAuthPermKey(uid), JSON.stringify(permissions))
  }

  async getPasswordVersionByUid(uid: bigint): Promise<string> {
    return this.redis.get(genAuthPVKey(uid))
  }

  async getTokenByUid(uid: bigint): Promise<string> {
    return this.redis.get(genAuthTokenKey(uid))
  }

  async wxLogin(dto) {
    const { code } = dto
    const APP_SECRET = env('MINI_APP_SECRET')
    const APP_ID = env('MINI_APP_ID')
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${code}&grant_type=authorization_code`
    try {
      const response = await lastValueFrom(
        this.httpService.get(url).pipe(map(response => response.data)),
      )
      const { openid, session_key } = response
      const { id } = await this.clientUserService.findOneByOpenId(openid)
      if (!id) {
        await this.clientUserService.createClientUser({ openid })
      }
      console.log('🚀 ~ AuthService ~ wxLogin ~ response:', response)
      return { token: this.jwtService.sign({ openid, session_key }), user_id: id }
    }
    catch (error) {
      console.error('Failed to fetch access token:', error)
      throw new Error('无法获取微信Access Token')
    }
  }
}
