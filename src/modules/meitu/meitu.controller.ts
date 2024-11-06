import { BadRequestException, Controller, Post, Req } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { AuthUser } from '../auth/decorators/auth-user.decorator'
import { MeituService } from './meitu.service'

@Controller('meitu')
export class MeituController {
  constructor(private readonly meituService: MeituService) {}

  // 生成动漫头像
  @Post()
  async uploadMeitu(@Req() req: FastifyRequest, @AuthUser() user: IAuthUser) {
    if (!req.isMultipart())
      throw new BadRequestException('Request is not multipart')

    const file = await req.file()

    try {
      const path = await this.meituService.saveFile(file, user.uid as any)

      return {
        filename: path,
      }
    }
    catch (error) {
      console.log(error)
      throw new BadRequestException('上传失败')
    }
  }
}
