// import * as fs from 'node:fs'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
// import { WeChatPayModule } from 'nest-wechatpay-node-v3'
import { OrderEntity } from './entities/order.entity'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

const providers = [OrderService]

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    // WeChatPayModule.registerAsync({
    //   useFactory: async () => {
    //     return {
    //       appid: '直连商户申请的公众号或移动应用appid',
    //       mchid: '商户号',
    //       publicKey: fs.readFileSync('./src/modules/order/pem/apiclient_cert.pem'), // 公钥
    //       privateKey: fs.readFileSync('./src/modules/order/pem/apiclient_key.pem'), // 秘钥
    //     }
    //   },
    // }),
  ],
  controllers: [OrderController],
  providers: [...providers],
  exports: [TypeOrmModule, ...providers],
})
export class OrderModule {}
