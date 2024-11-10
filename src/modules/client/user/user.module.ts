import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderModule } from '~/modules/order/order.module'
import { ClientUserEntity } from './entities/user.entity'
import { ClinetUserController } from './user.controller'
import { ClinetUserService } from './user.service'

const providers = [ClinetUserService]
@Module({
  imports: [
    TypeOrmModule.forFeature([ClientUserEntity]),
    OrderModule,
  ],
  controllers: [ClinetUserController],
  providers: [...providers],
  exports: [TypeOrmModule, ...providers],
})
export class ClinetUserModule {}
