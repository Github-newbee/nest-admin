import { EventSubscriberModel } from '@midwayjs/typeorm'
import { EntitySubscriberInterface, InsertEvent } from 'typeorm'
import { snowFlake } from '../../utils/snow.flake'

@EventSubscriberModel()
export class EverythingSubscriber implements EntitySubscriberInterface {
  beforeInsert(event: InsertEvent<any>) {
    if (this.shouldSkip(event.entity)) {
      return
    }
    if (!event.entity.id) {
      event.entity.id = snowFlake.nextId()
    }
  }

  private shouldSkip(entity: any): boolean {
    return !entity || Object.keys(entity).length === 0
  }
}
