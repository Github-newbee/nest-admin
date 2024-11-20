import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserModule } from '~/modules/user/user.module'
import { SiteController } from './site.controller'
import { SiteEntity } from './site.entity'
import { SiteService } from './site.service'

const services = [SiteService]

@Module({
  imports: [TypeOrmModule.forFeature([SiteEntity]), UserModule],
  controllers: [SiteController],
  providers: [...services],
  exports: [TypeOrmModule, ...services],
})
export class SiteModule {}
