import { Controller, Get } from '@nestjs/common'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ClinetUserService } from './user.service'

@Controller('user')
export class ClinetUserController {
  constructor(private readonly clinetUserService: ClinetUserService) {}

  @Get(':id')
  async read(@IdParam() id: bigint) {
    return this.clinetUserService.findOneById(id)
  }
}
