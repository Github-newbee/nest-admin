import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, Relation } from 'typeorm'
import { CompleteEntity } from '~/common/entity/common.entity'
import { ImageTemplateEntity } from '../img-template/img-template.entity'
import { SiteEntity } from '../site/site.entity'

@Entity({ name: 'sys_img_bundles' })
export class ImageBundlesEntity extends CompleteEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string

  @Column({ type: 'int', name: 'price' })
  price: number

  @Column({ type: 'tinyint', default: 1 })
  @ApiProperty({ description: ' 状态' })
  @Exclude()
  status: number

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ description: '备注' })
  remark: string

  @ManyToMany(() => ImageTemplateEntity, template => template.imgBundles)
  @JoinTable({
    name: 'sys_bundles_template',
    joinColumn: { name: 'img_bundles_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'img_template_id', referencedColumnName: 'id' },
  })
  imgTemplates: Relation<ImageTemplateEntity[]>

  @ManyToOne(() => SiteEntity, site => site.imgBundles)
  @JoinColumn({ name: 'site_id' })
  site: Relation<SiteEntity>

  constructor(partial: Partial<ImageBundlesEntity>) {
    super()
    Object.assign(this, partial)
  }
}
