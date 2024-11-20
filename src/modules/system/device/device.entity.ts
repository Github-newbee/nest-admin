import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Relation } from 'typeorm'

import { CompleteEntity } from '~/common/entity/common.entity'
import { OrderEntity } from '~/modules/order/entities/order.entity'
import { SiteEntity } from '../site/site.entity'

@Entity({ name: 'sys_device' })
export class DeviceEntity extends CompleteEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string

  @Column({ type: 'varchar', length: 50 })
  mac: string

  @Column({ type: 'tinyint', default: 1, comment: '是否在线' })
  online: boolean

  @Column({ type: 'tinyint', default: 1 })
  status: number

  @Column({ type: 'varchar', default: '' })
  remark: string

  @OneToMany(() => OrderEntity, user => user.device)
  order: Relation<OrderEntity>

  @ManyToOne(() => SiteEntity, site => site.device)
  @JoinColumn({ name: 'site_id' })
  site: Relation<SiteEntity>
}
