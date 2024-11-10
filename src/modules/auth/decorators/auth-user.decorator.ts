import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { FastifyRequest } from 'fastify'

type Payload = keyof IAuthUser

/**
 * @description 获取当前登录用户信息, 并挂载到request上
 */
export const AuthUser = createParamDecorator(
  (data: Payload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<FastifyRequest>()
    console.log('🚀 ~ request:', request)
    // auth guard will mount this
    const user = request.user as IAuthUser

    return data ? user?.[data] : user
  },
)
