import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, ManyToMany, OneToMany, Relation } from 'typeorm'

import { CompleteEntity } from '~/common/entity/common.entity'
import { ImageAIEntity } from '../img-ai/img-ai.entity'
import { ImageBundlesEntity } from '../img-bundles/img-bundles.entity'

@Entity({ name: 'sys_img_template' })
export class ImageTemplateEntity extends CompleteEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string

  @Column({ type: 'tinyint', default: 1 })
  @ApiProperty({ description: '类型' })
  type: number

  @Column({ type: 'tinyint', default: 1 })
  @ApiProperty({ description: ' 状态' })
  status: number

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ description: '备注' })
  remark: string

  @Column({
    name: 'template_url',
    type: 'varchar',
  })
  templateUrl: string

  @ManyToMany(() => ImageBundlesEntity, user => user.imgTemplates)
  imgBundles: Relation<ImageBundlesEntity[]>

  @OneToMany(() => ImageAIEntity, imageAI => imageAI.imageTemplate)
  imgAI: Relation<ImageAIEntity[]>
}
