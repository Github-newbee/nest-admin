import { IsInt, IsOptional, IsString } from 'class-validator'
import { PagerDto } from '~/common/dto/pager.dto'

export class DeviceDto {
  @IsString()
  name: string

  @IsString()
  mac: string

  @IsInt()
  @IsOptional()
  status?: number

  @IsString()
  @IsOptional()
  remark?: string
}

export class DeviceQueryDto extends PagerDto {

}
