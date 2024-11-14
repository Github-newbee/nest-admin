import { Column, Entity, OneToMany, Relation } from 'typeorm'

import { CompleteEntity } from '~/common/entity/common.entity'
import { OrderEntity } from '~/modules/order/entities/order.entity'

@Entity({ name: 'sys_device' })
export class DeviceEntity extends CompleteEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string

  @Column({ type: 'varchar', length: 50 })
  mac: string

  @Column({ type: 'tinyint', default: 1 })
  status: number

  @Column({ type: 'varchar', default: '' })
  remark: string

  @OneToMany(() => OrderEntity, user => user.device)
  order: Relation<OrderEntity>
}
