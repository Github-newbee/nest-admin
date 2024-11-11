import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { ImageAIDto } from './img-ai.dto'
import { ImageAIService } from './img-ai.service'

@ApiTags('System - ai图片生成模块')
@ApiSecurityAuth()
@Controller('img-ai')
export class ImageAIController {
  constructor(private imageAIService: ImageAIService) {}

  @Get()
  async list(@Query() dto: ImageAIDto): Promise<void> {
    // return this.imageAIService.result(dto)
  }

  @Post('generate')
  async create(@Body() dto: ImageAIDto): Promise<void> {
    return this.imageAIService.create(dto)
  }
}
