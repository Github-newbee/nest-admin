import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { Pagination } from '~/helper/paginate/pagination'
import { ImageTemplateDto, ImageTemplateDtoQueryDto } from './img-template.dto'
import { ImageTemplateEntity } from './img-template.entity'
import { ImageTemplateService } from './img-template.service'

@ApiTags('System - 图片模板模块')
@ApiSecurityAuth()
@Controller('img-template')
export class ImageTemplateController {
  constructor(private imageTemplateService: ImageTemplateService) {}

  @Get()
  async list(@Query() dto: ImageTemplateDtoQueryDto): Promise<Pagination<ImageTemplateEntity>> {
    return this.imageTemplateService.page(dto)
  }

  @Post()
  async create(@Body() dto: ImageTemplateDto): Promise<void> {
    return this.imageTemplateService.create(dto)
  }

  @Put(':id')
  async update(@IdParam() id: string, @Body() dto: Partial<ImageTemplateDto>): Promise<void> {
    await this.imageTemplateService.update(id, dto)
  }
}
