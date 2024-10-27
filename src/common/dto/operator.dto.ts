import { ApiHideProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'

export class OperatorDto {
  @ApiHideProperty()
  @Exclude()
  createBy: bigint

  @ApiHideProperty()
  @Exclude()
  updateBy: bigint
}
