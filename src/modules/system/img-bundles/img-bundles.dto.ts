import { ApiProperty } from '@nestjs/swagger'
import { ArrayMaxSize, IsInt, IsOptional, IsString, MinLength } from 'class-validator'
import { PagerDto } from '~/common/dto/pager.dto'
import { IsUnique } from '~/shared/database/constraints/unique.constraint'
import { ImageBundlesEntity } from './img-bundles.entity'

export class ImageBundlesDto {
  @ApiProperty({ description: '字典类型名称' })
  @IsUnique({ entity: ImageBundlesEntity, message: '已存在套餐名称' })
  @IsString()
  @MinLength(1)
  name: string

  @ApiProperty({ description: '状态' })
  @IsOptional()
  @IsInt()
  status?: number

  @ApiProperty({ description: '价格' })
  @IsInt()
  price: number

  @ApiProperty({ description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string

  @ArrayMaxSize(10)
  templateIds?: string[]
}

export class ImageBundlesDtoQueryDto extends PagerDto {
  // @ApiProperty({ description: '字典类型名称' })
  // @IsString()
  // @IsOptional()
  // name: string

  // @ApiProperty({ description: '字典类型code' })
  // @IsString()
  // @IsOptional()
  // code: string
}
