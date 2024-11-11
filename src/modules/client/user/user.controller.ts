import { Controller, Get } from '@nestjs/common'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ClientUserService } from './user.service'

@Controller('user')
export class ClientUserController {
  constructor(private readonly ClientUserService: ClientUserService) {}

  @Get(':id')
  async read(@IdParam() id: bigint) {
    return this.ClientUserService.findOneById(id)
  }
}
