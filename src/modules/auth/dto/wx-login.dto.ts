import { IsString } from 'class-validator'

export class WxLoingDto {
  @IsString()
  app_id: string

  @IsString()
  code: string
}
