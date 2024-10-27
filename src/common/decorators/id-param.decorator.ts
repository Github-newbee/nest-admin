import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'

// export function IdParam() {
//   return Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE, exceptionFactory: (_error) => {
//     throw new NotAcceptableException('id 格式不正确')
//   } }))
// }

// 将传递的请求id转换成bigint类型
export const IdParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): bigint => {
    const request = ctx.switchToHttp().getRequest()
    const param = request.params.id

    if (param === undefined || param === null) {
      throw new HttpException('id 不能为空', HttpStatus.BAD_REQUEST)
    }

    const id = param

    if (Number.isNaN(Number(id))) {
      throw new HttpException('id 格式不正确', HttpStatus.NOT_ACCEPTABLE)
    }

    return id
  },
)
