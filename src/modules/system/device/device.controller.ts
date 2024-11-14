import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { Pagination } from '~/helper/paginate/pagination'
import { DeviceDto, DeviceQueryDto } from './device.dto'
import { DeviceEntity } from './device.entity'
import { DeviceService } from './device.service'

@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Get()
  async list(@Query() dto: DeviceQueryDto): Promise<Pagination<DeviceEntity>> {
    return this.deviceService.page(dto)
  }

  @Post()
  async create(@Body() dto: DeviceDto): Promise<void> {
    await this.deviceService.create(dto)
  }

  @Put(':id')
  async update(@IdParam() id: string, @Body() dto: DeviceDto): Promise<void> {
    await this.deviceService.update(id, dto)
  }
}
