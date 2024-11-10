import { Body, Controller, Get, Post } from '@nestjs/common'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { AuthUser } from '../auth/decorators/auth-user.decorator'
import { OrderDto, OrderQueryDto } from './dto/order.dto'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('pre-order')
  async create(@Body() orderDto: OrderDto, @AuthUser() user: { openid: string }) {
    return this.orderService.create(orderDto, user.openid)
  }

  @Get()
  async findAll(@Body() dto: OrderQueryDto, @AuthUser() user: { openid?: string }) {
    return this.orderService.list(dto, user?.openid)
  }

  // 当微信官方收到上面的数据,将多次调用notify_url,将支付信息传递过来
  @Post()
  async notify_url(@Body() body: any) {
    // 这个body中是更私密的支付信息,我们通过解密之后才能拿到
    const v3 = '........' // 解密密钥
    const { resource } = body
    const { ciphertext, associated_data, nonce } = resource
    // out_trade_no 这个数据就是我们自行生成的支付的订单编号,可以根据这个查到此次支付信息
    // const { out_trade_no } = await this.wxPay.decipher_gcm(ciphertext, associated_data, nonce, v3)

    // TODO: 需要根据返回的不同支付状态调整订单的支付状态

    // 到这里支付就算是完成了
  }

  // 查询订单支付结果
  @Get(':id/result')
  async result(@IdParam() id: string) {
    return this.orderService.result(id)
  }
}
