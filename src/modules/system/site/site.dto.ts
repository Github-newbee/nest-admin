import { IsInt, IsOptional, IsString } from 'class-validator'
import { PagerDto } from '~/common/dto/pager.dto'

export class SiteDto {
  @IsString()
  name: string

  @IsInt()
  @IsOptional()
  status?: number

  @IsString()
  @IsOptional()
  remark?: string
}

export class SiteQueryDto extends PagerDto {

}
