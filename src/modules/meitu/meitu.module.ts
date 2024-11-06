import { Module } from '@nestjs/common'
import { MeituController } from './meitu.controller'
import { MeituService } from './meitu.service'

@Module({
  controllers: [MeituController],
  providers: [MeituService],
})
export class MeituModule {}
