import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { EntityManager } from 'typeorm'
import { doRequestModel } from '~/utils/volcengine.util'
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

    // const data = {
    //   // 换脸
    //   req_key: 'face_swap3_6',
    //   image_urls: [
    //     imgRaw,
    //     imgTemplate,
    //   ],
    //   face_type: 'area',
    //   merge_infos: [
    //     {
    //       location: 1,
    //       template_location: 1,
    //     },
    //   ],
    //   logo_info: {
    //     add_logo: true,
    //     position: 1,
    //     language: 1,
    //     logo_text_content: '这里是明水印内容',
    //   },
    //   return_url: true,
    // }
    // 动漫化
    const modelData = {
      // AIGC风格化 - 动漫风格化
      req_key: 'img2img_makoto_style',
      image_urls: [
        'https://test-noproblem-api.wegui.cn/static/images/20241112100912372999.jpg',
      ],
      return_url: true,
    }
    const query = {
      Version: '2022-08-31',
      Action: 'CVProcess',
    }

    const res = await doRequestModel(modelData, query)
    console.log('🚀 ~ ImageAIService ~ create ~ 图片生成结果res:', res)
    // await this.entityManager.transaction(async (manager) => {
    //   const templates = await this.imageTemplateRepository.findBy({ id: In(templateIds) })
    //   const bundles = manager.create(ImageAIEntity, {
    //     ...data,
    //   })
    //   const res = await manager.save(bundles)
    //   return res
    // })
    // 返回生成结果
  }
}
