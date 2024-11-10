import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger'
import { IsInt, IsOptional } from 'class-validator'
import { PagerDto } from '~/common/dto/pager.dto'

export class OrderDto {
  @IsOptional()
  amount: number
}

export class OrderQueryDto extends IntersectionType(PagerDto<OrderDto>, PartialType(OrderDto)) {
  @ApiProperty({ description: '状态' })
  @IsInt()
  @IsOptional()
  status?: number
}
