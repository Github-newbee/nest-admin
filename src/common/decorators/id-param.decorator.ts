import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { isEmpty } from 'lodash'

// export function IdParam() {
//   return Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE, exceptionFactory: (_error) => {
//     throw new NotAcceptableException('id 格式不正确')
//   } }))
// }

// 将传递的请求id
export const IdParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): bigint => {
    const request = ctx.switchToHttp().getRequest()
    const id = request.params.id
    console.log('🚀 ~ param:', typeof id)

    if (isEmpty(id)) {
      throw new HttpException('id 不能为空', HttpStatus.BAD_REQUEST)
    }
    if (Number.isNaN(Number(id))) {
      throw new HttpException('id 格式不正确', HttpStatus.NOT_ACCEPTABLE)
    }
    return id
  },
)
