import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderModule } from '~/modules/order/order.module'
import { ClientUserEntity } from './entities/user.entity'
import { ClientUserController } from './user.controller'
import { ClientUserService } from './user.service'

const providers = [ClientUserService]
@Module({
  imports: [
    TypeOrmModule.forFeature([ClientUserEntity]),
    OrderModule,
  ],
  controllers: [ClientUserController],
  providers: [...providers],
  exports: [TypeOrmModule, ...providers],
})
export class ClientUserModule {}
