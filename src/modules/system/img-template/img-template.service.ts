import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'
import { ImageTemplateDto, ImageTemplateDtoQueryDto } from './img-template.dto'
import { ImageTemplateEntity } from './img-template.entity'

@Injectable()
export class ImageTemplateService {
  constructor(
    @InjectRepository(ImageTemplateEntity)
    private imageTemplateRepository: Repository<ImageTemplateEntity>,
  ) {}

  /**
   * 罗列所有配置
   */
  async page({
    page,
    pageSize,
  }: ImageTemplateDtoQueryDto): Promise<Pagination<ImageTemplateEntity>> {
    const queryBuilder = this.imageTemplateRepository.createQueryBuilder('sys_img_template').where({
      // ...(name && { name: Like(`%${name}%`) }),
      // ...(code && { code: Like(`%${code}%`) }),
    })

    return paginate(queryBuilder, { page, pageSize })
  }

  /** 一次性获取所有的字典类型 */
  async getAll() {
    return this.imageTemplateRepository.find()
  }

  /**
   * 获取参数总数
   */
  async countConfigList(): Promise<number> {
    return this.imageTemplateRepository.count()
  }

  /**
   * 新增
   */
  async create(dto: ImageTemplateDto): Promise<void> {
    await this.imageTemplateRepository.insert(dto)
  }

  /**
   * 更新
   */
  async update(id: string, dto: Partial<ImageTemplateDto>): Promise<void> {
    await this.imageTemplateRepository.update(id, dto)
  }

  /**
   * 删除
   */
  async delete(id: any): Promise<void> {
    await this.imageTemplateRepository.delete(id)
  }

  /**
   * 查询单个
   */
  async findOne(id: bigint): Promise<ImageTemplateEntity> {
    return this.imageTemplateRepository.findOneBy({ id })
  }
}
