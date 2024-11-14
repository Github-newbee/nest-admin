import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'
import { DeviceDto, DeviceQueryDto } from './device.dto'
import { DeviceEntity } from './device.entity'

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceEntity)
    private deviceRepository: Repository<DeviceEntity>,
  ) {}

  /**
   * 罗列所有配置
   */
  async page({
    page,
    pageSize,
  }: DeviceQueryDto): Promise<Pagination<DeviceEntity>> {
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
  async create(dto: DeviceDto): Promise<void> {
    await this.deviceRepository.insert(dto)
  }

  /**
   * 更新
   */
  async update(id: string, dto: Partial<DeviceDto>): Promise<void> {
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
  async findOne(id: bigint): Promise<DeviceEntity> {
    return this.deviceRepository.findOneBy({ id })
  }
}
