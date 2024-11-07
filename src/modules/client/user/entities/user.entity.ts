import { Column, Entity } from 'typeorm'
import { CommonEntity } from '~/common/entity/common.entity'

@Entity({ name: 'client_user' })
export class ClientUserEntity extends CommonEntity {
  @Column({ unique: true })
  openid: string

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  remark: string

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  status: number

  sessionKey: string
}
