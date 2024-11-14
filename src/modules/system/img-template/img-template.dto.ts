import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator'
import { PagerDto } from '~/common/dto/pager.dto'
import { IsUnique } from '~/shared/database/constraints/unique.constraint'
import { ImageTemplateEntity } from './img-template.entity'

export class ImageTemplateDto {
  @ApiProperty({ description: '字典类型名称' })
  @IsUnique({ entity: ImageTemplateEntity, message: '已存在模板名称' })
  @IsString()
  @MinLength(1)
  name: string

  @ApiProperty({ description: '状态' })
  @IsOptional()
  @IsInt()
  status?: number

  @ApiProperty({ description: '模板路径' })
  @IsString()
  templateUrl: string

  @ApiProperty({ description: '类型' })
  @IsOptional()
  @IsInt()
  type?: number

  @ApiProperty({ description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string
}

export class ImageTemplateDtoQueryDto extends PagerDto {
  // @ApiProperty({ description: '字典类型名称' })
  // @IsString()
  // @IsOptional()
  // name: string

  // @ApiProperty({ description: '字典类型code' })
  // @IsString()
  // @IsOptional()
  // code: string
}
