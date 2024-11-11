import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { Pagination } from '~/helper/paginate/pagination'
import { ImageBundlesDto, ImageBundlesDtoQueryDto } from './img-bundles.dto'
import { ImageBundlesEntity } from './img-bundles.entity'
import { ImageBundlesService } from './img-bundles.service'

@ApiTags('System - 套餐模块')
@ApiSecurityAuth()
@Controller('img-bundles')
export class ImageBundlesController {
  constructor(private imageBundlesService: ImageBundlesService) {}

  @Get()
  async list(@Query() dto: ImageBundlesDtoQueryDto): Promise<Pagination<ImageBundlesEntity>> {
    return this.imageBundlesService.page(dto)
  }

  @Post()
  async create(@Body() dto: ImageBundlesDto): Promise<void> {
    return this.imageBundlesService.create(dto)
  }
}
