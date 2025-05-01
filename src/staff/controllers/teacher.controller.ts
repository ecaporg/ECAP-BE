import { Repository } from 'typeorm';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';

import {
  ApiCrudResponse,
  ApiErrorResponses,
  ApiPaginatedCrudResponse,
  ApiPaginationQueries,
  BaseService,
  EntityId,
  GenericEntity,
  PaginatedResult,
  PaginationOptions,
  Roles,
} from '@/core';
import { RolesEnum } from '@/users/enums/roles.enum';

import { TeacherEntity } from '../entities/staff.entity';
import { TeacherService } from '../services/staff.service';

@ApiTags('Teacher')
@Controller('teachers')
@Roles(
  RolesEnum.SUPER_ADMIN,
  RolesEnum.ADMIN,
  RolesEnum.DIRECTOR,
  RolesEnum.TEACHER,
)
export class TeacherController {
  protected readonly service: BaseService<TeacherEntity>;
  constructor(private readonly teacherService: TeacherService) {}

  // @Get()
  // @ApiOperation({ summary: 'Get all entities with pagination' })
  // @ApiPaginationQueries()
  // @ApiPaginatedCrudResponse(TeacherEntity)
  // async findAll(
  //   @Query() options?: PaginationOptions,
  // ): Promise<PaginatedResult<GenericEntity>> {
  //   return this.service.findAll(options);
  // }

  @Get(':id')
  @ApiOperation({ summary: 'Get entity by ID' })
  @ApiCrudResponse(TeacherEntity)
  async findOne(@Param('id') id: EntityId): Promise<TeacherEntity> {
    return this.service.findOne(id);
  }

  // @Post()
  // @ApiOperation({ summary: 'Create a new entity' })
  // @ApiCrudResponse(TeacherEntity, 'created')
  // async create(@Body() createDto: any): Promise<TeacherEntity> {
  //   return this.service.create(
  //     createDto as unknown as DeepPartial<TeacherEntity>,
  //   );
  // }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Update an entity' })
  // @ApiCrudResponse(TeacherEntity)
  // async update(
  //   @Param('id') id: EntityId,
  //   @Body() updateDto: any,
  // ): Promise<GenericEntity> {
  //   return this.service.update(
  //     id,
  //     updateDto as unknown as DeepPartial<TeacherEntity>,
  //   );
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete an entity' })
  // @ApiOkResponse({ description: 'Entity deleted successfully' })
  // @ApiErrorResponses()
  // async delete(@Param('id') id: EntityId): Promise<void> {
  //   return this.service.delete(id);
  // }
}
