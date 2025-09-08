import { Repository } from 'typeorm';

import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
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
  FILTER_SEPARATOR_FOR_MULTIPLE_VALUES,
  GenericEntity,
  PaginatedResult,
  PaginationOptions,
  QueryParamMapperInterceptor,
  Roles,
} from '../../../core';
import { AttachASearchFieldsInterceptor } from '../../../core/interceptors/attach-search_fields.interceptor';
import { RolesEnum } from '../../users/enums/roles.enum';
import { TeachersFilterDto } from '../dto/filters.dto';
import { TeacherEntity } from '../entities/staff.entity';
import { TeacherFilterInterceptor } from '../interceptors/teacher-filter.interceptor';
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
  constructor(private readonly service: TeacherService) {}

  @Get()
  @UseInterceptors(
    new AttachASearchFieldsInterceptor<TeacherEntity>([
      'user.name',
      'user.email',
    ]),
    TeacherFilterInterceptor,
  )
  @ApiOperation({ summary: 'Get all entities with pagination' })
  @ApiPaginationQueries()
  @ApiPaginatedCrudResponse(TeacherEntity)
  async findAll(
    @Query() options?: TeachersFilterDto,
  ): Promise<PaginatedResult<GenericEntity>> {
    return this.service.findAll(options, { user: true });
  }

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
