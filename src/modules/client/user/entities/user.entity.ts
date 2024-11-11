import { Column, Entity, OneToMany, Relation } from 'typeorm'
import { CommonEntity } from '~/common/entity/common.entity'
import { OrderEntity } from '~/modules/order/entities/order.entity'

@Entity({ name: 'client_user' })
export class ClientUserEntity extends CommonEntity {
  @Column({ unique: true })
  openid: string

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  remark: string

  @Column({ type: 'tinyint', default: 1 })
  status: number

  sessionKey: string

  @OneToMany(() => OrderEntity, order => order.clientUser)
  orders: Relation<OrderEntity[]>
}
