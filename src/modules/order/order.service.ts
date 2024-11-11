import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { isNil } from 'lodash'
import { Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'
import { OrderDto, OrderQueryDto } from './dto/order.dto'
import { OrderEntity } from './entities/order.entity'

@Injectable()
export class OrderService {
  constructor(@InjectRepository(OrderEntity)
  private readonly orderRepository: Repository<OrderEntity>) {}

  async create(orderDto: OrderDto, openid: string) {
    // 这里的params就是小程序传递的相关参数
    const { amount } = orderDto

    const options = {
      appid: '',
      mchid: '商户号',
      description: '',
      out_trade_no: '自行生成的订单编号(id)',
      notify_url: '支付完成后微信将通过这个接口返回给你支付结果,必须保证是一个公网的域名,如:http://baidu.com/notify',
      amount: {
        total: amount, // 转化后的数据
      },
      payer: {
        openid,
      },
    }
    // TODO: 这里省略了将这条支付订单保存到数据库的步骤,请读者自行编写
    // 请求微信官方服务器
    // const res = await this.wxPay.transactions_jsapi(options)
    // 这个res中就包含了小程序调起微信支付的相关参数
    // return res
  }

  /**
   * 查询订单列表
   */
  async list({
    status,
    page,
    pageSize,
  }: OrderQueryDto, openid: string): Promise<Pagination<OrderEntity>> {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.clientUser', 'clientUser')
      .where('clientUser.openid = :openid', { openid })
      .where({
        ...(!isNil(status) ? { status } : null),
      })

    // 当需要查询小程序订单，通过关联关系查询，openid是clientUser的字段
    // if (openid) {
    //   queryBuilder.where('clientUser.openid = :openid', { openid })
    // }

    return paginate<OrderEntity>(queryBuilder, {
      page,
      pageSize,
    })
  }

  /**
   * 查找订单信息(支付状态为成功的)
   * @param id 订单id
   */
  async result(id: string): Promise<OrderEntity> {
    return await this.orderRepository
      .createQueryBuilder('order')
      .where({
        id,
      })
      .getOne()
  }

  // 根据订单号查询订单信息
}
