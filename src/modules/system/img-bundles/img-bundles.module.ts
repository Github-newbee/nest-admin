import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImageTemplateModule } from '../img-template/img-template.module'
import { ImageBundlesController } from './img-bundles.controller'
import { ImageBundlesEntity } from './img-bundles.entity'
import { ImageBundlesService } from './img-bundles.service'

const services = [ImageBundlesService]

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageBundlesEntity]),
    ImageTemplateModule,
  ],
  controllers: [ImageBundlesController],
  providers: [...services],
  exports: [TypeOrmModule, ...services],
})
export class ImageBundlesModule {}
