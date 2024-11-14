import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserModule } from '~/modules/user/user.module'
import { DeviceController } from './device.controller'
import { DeviceEntity } from './device.entity'
import { DeviceService } from './device.service'

const services = [DeviceService]

@Module({
  imports: [TypeOrmModule.forFeature([DeviceEntity]), UserModule],
  controllers: [DeviceController],
  providers: [...services],
  exports: [TypeOrmModule, ...services],
})
export class DeviceModule {}
