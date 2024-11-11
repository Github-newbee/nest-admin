import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '~/common/decorators/api-result.decorator'
import { IdParam } from '~/common/decorators/id-param.decorator'

import { Pagination } from '~/helper/paginate/pagination'
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator'
import { Resource } from '~/modules/auth/decorators/resource.decorator'

import { ResourceGuard } from '~/modules/auth/guards/resource.guard'
import { TodoEntity } from '~/modules/todo/todo.entity'

import { TodoDto, TodoQueryDto, TodoUpdateDto } from './todo.dto'
import { TodoService } from './todo.service'

export const permissions = definePermission('todo', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
} as const)

@ApiTags('Business - Todo模块')
@UseGuards(ResourceGuard)
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: '获取Todo列表' })
  @ApiResult({ type: [TodoEntity] })
  @Perm(permissions.LIST)
  async list(@Query() dto: TodoQueryDto): Promise<Pagination<TodoEntity>> {
    return this.todoService.list(dto)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取Todo详情' })
  @ApiResult({ type: TodoEntity })
  @Perm(permissions.READ)
  async info(@IdParam() id: bigint): Promise<TodoEntity> {
    console.log('🚀 ~ TodoController ~ info ~ id:', typeof id)
    return this.todoService.detail(id)
  }

  @Post()
  @ApiOperation({ summary: '创建Todo' })
  @Perm(permissions.CREATE)
  async create(@Body() dto: TodoDto): Promise<void> {
    await this.todoService.create(dto)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新Todo' })
  @Perm(permissions.UPDATE)
  @Resource(TodoEntity)
  async update(@IdParam() id: bigint, @Body()dto: TodoUpdateDto): Promise<void> {
    await this.todoService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除Todo' })
  @Perm(permissions.DELETE)
  @Resource(TodoEntity)
  async delete(@IdParam() id: bigint): Promise<void> {
    await this.todoService.delete(id)
  }
}
