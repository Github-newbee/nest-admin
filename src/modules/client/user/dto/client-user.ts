import { IsIn, IsOptional, IsString } from 'class-validator'

export class ClientUserDto {
  openid: string

  @IsIn([1, 2])
  status: number

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsString()
  remark?: string
}
