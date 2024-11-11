import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { EntityManager } from 'typeorm'
import { ImageTemplateEntity } from '../img-template/img-template.entity'
import { ImageAIDto } from './img-ai.dto'
import { ImageAIEntity } from './img-ai.entity'

@Injectable()
export class ImageAIService {
  constructor(
    @InjectRepository(ImageAIEntity)
   @InjectRepository(ImageTemplateEntity)
    @InjectEntityManager() private entityManager: EntityManager,
  ) {}

  // 返回模型生成的图片结果
  async result(data: ImageAIDto): Promise<void> {
    // 根据设备唯一参数查到设备id
    // 根据设备id查到第一条订单id
    // 根据订单id查到生成结果
  }

  /**
   * 插入ai生成的结果数据
   */
  async create(data: ImageAIDto): Promise<void> {
    // TODO 请求大模型接口生成图片
    console.log('🚀 ~ ImageAIService ~ create ~ data:', data)

    // await this.entityManager.transaction(async (manager) => {
    //   const templates = await this.imageTemplateRepository.findBy({ id: In(templateIds) })
    //   const bundles = manager.create(ImageAIEntity, {
    //     ...data,
    //   })
    //   const res = await manager.save(bundles)
    //   return res
    // })
  }
}
