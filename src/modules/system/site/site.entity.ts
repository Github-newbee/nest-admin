import { Column, Entity, OneToMany, Relation } from 'typeorm'

import { CompleteEntity } from '~/common/entity/common.entity'
import { DeviceEntity } from '../device/device.entity'
import { ImageBundlesEntity } from '../img-bundles/img-bundles.entity'

@Entity({ name: 'sys_site' })
export class SiteEntity extends CompleteEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string

  @Column({ type: 'tinyint', default: 1 })
  status: number

  @Column({ type: 'varchar', default: '' })
  remark: string

  @OneToMany(() => DeviceEntity, device => device.site)
  device: Relation<DeviceEntity[]>

  @OneToMany(() => ImageBundlesEntity, device => device.site)
  imgBundles: Relation<ImageBundlesEntity[]>
}
