import { IsString } from 'class-validator'

export class WxLoingDto {
  @IsString()
  code: string
}
