import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImageAIController } from './img-ai.controller'
import { ImageAIEntity } from './img-ai.entity'
import { ImageAIService } from './img-ai.service'

const services = [ImageAIService]

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageAIEntity]),
  ],
  controllers: [ImageAIController],
  providers: [...services],
  exports: [TypeOrmModule, ...services],
})
export class ImageAIModule {}
