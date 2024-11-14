import { IsString } from 'class-validator'

export class ImageAIDto {
  @IsString()
  sourceUrl: string
}
