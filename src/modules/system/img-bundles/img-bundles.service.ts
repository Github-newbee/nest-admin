import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { EntityManager, In, Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'
import { ImageTemplateEntity } from '../img-template/img-template.entity'
import { ImageBundlesDto, ImageBundlesDtoQueryDto } from './img-bundles.dto'
import { ImageBundlesEntity } from './img-bundles.entity'

@Injectable()
export class ImageBundlesService {
  constructor(
    @InjectRepository(ImageBundlesEntity)
    private imageBundlesRepository: Repository<ImageBundlesEntity>,
   @InjectRepository(ImageTemplateEntity)
    private imageTemplateRepository: Repository<ImageTemplateEntity>,
    @InjectEntityManager() private entityManager: EntityManager,
  ) {}

  /**
   * 查询套餐和对应的模板
   */
  async page({
    page,
    pageSize,
  }: ImageBundlesDtoQueryDto): Promise<Pagination<ImageBundlesEntity>> {
    const queryBuilder = this.imageBundlesRepository.createQueryBuilder('imageBundles')
      .leftJoinAndSelect('imageBundles.imgTemplates', 'imgTemplates')
      .where({
      // ...(name && { name: Like(`%${name}%`) }),
      // ...(code && { code: Like(`%${code}%`) }),
      })

    return paginate(queryBuilder, { page, pageSize })
  }

  /** 一次性获取所有的字典类型 */
  async getAll() {
    return this.imageBundlesRepository.find()
  }

  /**
   * 获取参数总数
   */
  async countConfigList(): Promise<number> {
    return this.imageBundlesRepository.count()
  }

  /**
   * 套餐
   */
  async create({ templateIds, ...data }: ImageBundlesDto): Promise<void> {
    await this.entityManager.transaction(async (manager) => {
      const templates = await this.imageTemplateRepository.findBy({ id: In(templateIds) })
      const bundles = manager.create(ImageBundlesEntity, {
        ...data,
        imgTemplates: templates,
      })
      const res = await manager.save(bundles)
      return res
    })
  }

  /**
   * 更新
   */
  async update(id: string, { templateIds, ...data }: Partial<ImageBundlesDto>): Promise<void> {
    await this.entityManager.transaction(async (manager) => {
      await manager.update(ImageBundlesEntity, id, data)
      const bundles = await this.imageBundlesRepository
        .createQueryBuilder('imageBundles')
        .leftJoinAndSelect('imageBundles.imgTemplates', 'imgTemplates')
        .where('imageBundles.id = :id', { id })
        .getOne()
      if (templateIds) {
        await manager.createQueryBuilder()
          .relation(ImageBundlesEntity, 'imgTemplates')
          .of(id)
          .addAndRemove(templateIds, bundles.imgTemplates)
      }
    })

    // await this.imageBundlesRepository.update(id, dto)
  }

  /**
   * 删除
   */
  async delete(id: string): Promise<void> {
    await this.imageBundlesRepository.delete(id)
  }

  /**
   * 查询单个
   */
  async findOne(id: bigint): Promise<ImageBundlesEntity> {
    return this.imageBundlesRepository.findOneBy({ id })
  }
}
