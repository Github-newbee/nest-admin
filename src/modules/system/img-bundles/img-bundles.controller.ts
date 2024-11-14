import { Body, ClassSerializerInterceptor, Controller, Get, Post, Put, Query, UseInterceptors } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { IdParam } from '~/common/decorators/id-param.decorator'
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async list(@Query() dto: ImageBundlesDtoQueryDto): Promise<Pagination<ImageBundlesEntity>> {
    return this.imageBundlesService.page(dto)
  }

  @Post()
  async create(@Body() dto: ImageBundlesDto): Promise<void> {
    return this.imageBundlesService.create(dto)
  }

  @Put(':id')
  async update(@IdParam() id: string, @Body() dto: Partial<ImageBundlesDto>): Promise<void> {
    await this.imageBundlesService.update(id, dto)
  }
}
