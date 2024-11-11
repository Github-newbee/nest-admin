import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImageTemplateController } from './img-template.controller'
import { ImageTemplateEntity } from './img-template.entity'
import { ImageTemplateService } from './img-template.service'

const services = [ImageTemplateService]

@Module({
  imports: [TypeOrmModule.forFeature([ImageTemplateEntity])],
  controllers: [ImageTemplateController],
  providers: [...services],
  exports: [TypeOrmModule, ...services],
})
export class ImageTemplateModule {}
