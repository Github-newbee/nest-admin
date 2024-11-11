import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CommonEntity } from '~/common/entity/common.entity'
import { ClientUserDto } from './dto/client-user'
import { ClientUserEntity } from './entities/user.entity'

@Injectable()
export class ClientUserService {
  constructor(
    @InjectRepository(ClientUserEntity)
    private readonly clientUserRepository: Repository<ClientUserEntity>,
  ) {}

  // async getInfo({
  //   page,
  //   pageSize,
  // }): Promise<ClientUserDto[]> {
  //   const queryBuilder = this.clientUserRepository.createQueryBuilder('client-user')
  //   return paginate<ClientUserEntity>(queryBuilder, {
  //     page,
  //     pageSize,
  //   })
  // }

  // 根据id查询用户信息
  async findOneById(id: bigint): Promise<ClientUserDto> {
    // return this.clientUserRepository.createQueryBuilder('client-user')
    //   .where({
    //     id,
    //   })
    //   .getOne()
    // 简化写法
    return this.clientUserRepository.findOne({ where: { id } })
  }

  async findOneByOpenId(openId: string): Promise<ClientUserDto & CommonEntity> {
    // return this.clientUserRepository.createQueryBuilder('client-user')
    //   .where({
    //     openid: openId,
    //   })
    //   .getOne()
    return this.clientUserRepository.findOne({ where: { openid: openId } })
  }

  async createClientUser({ openid }): Promise<ClientUserDto> {
    return this.clientUserRepository.save({ openid })
  }
}
