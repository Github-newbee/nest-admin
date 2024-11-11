import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm'
import { CompleteEntity } from '~/common/entity/common.entity'
import { OrderEntity } from '~/modules/order/entities/order.entity'

@Entity({ name: 'sys_img_ai' })
export class ImageAIEntity extends CompleteEntity {
  @Column({ type: 'tinyint', comment: '模型名称', default: 1 })
  model: string

  @Column({
    comment: '图片链接',
    name: 'img_ai_url',
    type: 'varchar',
    nullable: true,
  })
  aiImgUrl: string

  @ManyToOne(() => OrderEntity, order => order.imageAI)
  @JoinColumn({ name: 'order_id' })
  orders: Relation<OrderEntity>
}
