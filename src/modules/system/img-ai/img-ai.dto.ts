import { PartialType } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { ImageAIEntity } from './img-ai.entity'

export class ImageAIDto extends PartialType(ImageAIEntity) {
  @IsString()
  sourceUrl: string
}
