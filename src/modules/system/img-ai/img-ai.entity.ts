import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm'
import { CompleteEntity } from '~/common/entity/common.entity'
import { OrderEntity } from '~/modules/order/entities/order.entity'
import { ImageTemplateEntity } from '../img-template/img-template.entity'

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

  @Column({ default: 1, nullable: true, type: 'tinyint', name: 'status', comment: '生成状态' })
  status: number

  @ManyToOne(() => OrderEntity, order => order.imageAI)
  @JoinColumn({ name: 'order_id' })
  orders: Relation<OrderEntity>

  @ManyToOne(() => ImageTemplateEntity, imageTemplate => imageTemplate.imgAI)
  @JoinColumn({ name: 'img_template_id' })
  imageTemplate: Relation<ImageTemplateEntity>
}
