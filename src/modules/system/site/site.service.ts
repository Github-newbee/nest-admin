import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'
import { SiteDto, SiteQueryDto } from './site.dto'
import { SiteEntity } from './site.entity'

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(SiteEntity)
    private deviceRepository: Repository<SiteEntity>,
  ) {}

  /**
   * 罗列所有配置
   */
  async page({
    page,
    pageSize,
  }: SiteQueryDto): Promise<Pagination<SiteEntity>> {
    const queryBuilder = this.deviceRepository.createQueryBuilder('device').where({
      // ...(label && { label: Like(`%${label}%`) }),
      // ...(value && { value: Like(`%${value}%`) }),
      // type: {
      //   id: typeId,
      // },
    })

    return paginate(queryBuilder, { page, pageSize })
  }

  /**
   * 新增
   */
  async create(dto: SiteDto): Promise<void> {
    await this.deviceRepository.insert(dto)
  }

  /**
   * 更新
   */
  async update(id: string, dto: Partial<SiteDto>): Promise<void> {
    // const { typeId, ...rest } = dto
    await this.deviceRepository.update(id, dto)
  }

  /**
   * 删除
   */
  async delete(id: any): Promise<void> {
    await this.deviceRepository.delete(id)
  }

  /**
   * 查询单个
   */
  async findOne(id: bigint): Promise<SiteEntity> {
    return this.deviceRepository.findOneBy({ id })
  }
}
