import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Relation } from 'typeorm'
import { CommonEntity } from '~/common/entity/common.entity'
import { ClientUserEntity } from '~/modules/client/user/entities/user.entity'
import { ImageAIEntity } from '~/modules/system/img-ai/img-ai.entity'

@Entity({ name: 'order' })
export class OrderEntity extends CommonEntity {
  @Column({ type: 'int', name: 'amount' })
  amount: number

  @Column({ type: 'int', name: 'payed' })
  payed: number

  @Column({ name: 'pay_type', type: 'tinyint', nullable: true, default: 1 })
  payType: number

  @Column({ default: 1, nullable: true, type: 'tinyint', name: 'pay_status' })
  payStatus: number

  @Column({ default: 1, type: 'tinyint', nullable: true })
  status: number

  @Column({ name: 'remark', nullable: true })
  remark: string

  @Column({ name: 'transaction_id', nullable: true, default: '' })
  transactionId: string

  @ManyToOne(() => ClientUserEntity, user => user.orders)
  @JoinColumn({ name: 'client_user_id' })
  clientUser: Relation<ClientUserEntity>

  @OneToMany(() => ImageAIEntity, image => image.orders)
  imageAI: Relation<ImageAIEntity[]>
}
