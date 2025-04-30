import { DeepPartial } from 'typeorm';

import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

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
} from '@/core';

class GenericEntityClass implements GenericEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Template Controller
 *
 * This is a template for creating a new controller.
 * Replace 'TemplateController' with your controller name.
 * Replace 'TemplateEntity' with your entity name.
 * Replace 'CreateTemplateDTO' with your create DTO name.
 * Replace 'UpdateTemplateDTO' with your update DTO name.
 */

// @ApiTags('Base')
// @Controller('base')
// @Roles(
//   RolesEnum.SUPER_ADMIN,
//   RolesEnum.ADMIN,
//   RolesEnum.DIRECTOR,
//   RolesEnum.TEACHER,
// )
export class TemplateController {
  constructor(protected readonly service: BaseService<GenericEntity, any>) {}

  @Get()
  @ApiOperation({ summary: 'Get all entities with pagination' })
  @ApiPaginationQueries()
  @ApiPaginatedCrudResponse(GenericEntityClass)
  async findAll(
    @Query() options?: PaginationOptions,
  ): Promise<PaginatedResult<GenericEntity>> {
    return this.service.findAll(options);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get entity by ID' })
  @ApiCrudResponse(GenericEntityClass)
  async findOne(@Param('id') id: EntityId): Promise<GenericEntity> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new entity' })
  @ApiCrudResponse(GenericEntityClass, 'created')
  async create(@Body() createDto: any): Promise<GenericEntity> {
    return this.service.create(
      createDto as unknown as DeepPartial<GenericEntity>,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an entity' })
  @ApiCrudResponse(GenericEntityClass)
  async update(
    @Param('id') id: EntityId,
    @Body() updateDto: any,
  ): Promise<GenericEntity> {
    return this.service.update(
      id,
      updateDto as unknown as DeepPartial<GenericEntity>,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an entity' })
  @ApiOkResponse({ description: 'Entity deleted successfully' })
  @ApiErrorResponses()
  async delete(@Param('id') id: EntityId): Promise<void> {
    return this.service.delete(id);
  }
}
