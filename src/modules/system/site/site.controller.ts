import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { Pagination } from '~/helper/paginate/pagination'
import { SiteDto, SiteQueryDto } from './site.dto'
import { SiteEntity } from './site.entity'
import { SiteService } from './site.service'

@Controller('site')
export class SiteController {
  constructor(private siteService: SiteService) {}

  @Get()
  async list(@Query() dto: SiteQueryDto): Promise<Pagination<SiteEntity>> {
    return this.siteService.page(dto)
  }

  @Post()
  async create(@Body() dto: SiteDto): Promise<void> {
    await this.siteService.create(dto)
  }

  @Put(':id')
  async update(@IdParam() id: string, @Body() dto: SiteDto): Promise<void> {
    await this.siteService.update(id, dto)
  }
}
