import { DeepPartial } from 'typeorm';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  ApiCrudResponse,
  ApiErrorResponses,
  ApiPaginatedCrudResponse,
  ApiPaginationQueries,
  CurrentUser,
  EntityId,
  PaginatedResult,
  Roles,
} from '@/core';
import { UserEntity } from '@/users/entities/user.entity';
import { RolesEnum } from '@/users/enums/roles.enum';

import { SchoolFilterDto } from '../dto/filters.dto';
import { CreateSchoolDto, UpdateSchoolDto } from '../dto/school.dto';
import { SchoolEntity as School } from '../entities/school.entity';
import { SchoolFilterInterceptor } from '../interceptors/school-filter.interceptor';
import { SchoolService } from '../services/school.service';
// --------------------------------------------------------------------------

@ApiTags('Schools')
@Controller('schools')
@UseInterceptors(SchoolFilterInterceptor)
@Roles(RolesEnum.SUPER_ADMIN)
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get()
  @ApiOperation({ summary: 'Get all schools with pagination' })
  @ApiPaginationQueries()
  @ApiPaginatedCrudResponse(School)
  @Roles(
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.DIRECTOR,
    RolesEnum.TEACHER,
  )
  async findAll(
    @Query() options?: SchoolFilterDto,
  ): Promise<PaginatedResult<School>> {
    console.log(options);
    return this.schoolService.findAll(options);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get school by ID' })
  @ApiCrudResponse(School)
  @Roles(
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.DIRECTOR,
    RolesEnum.TEACHER,
  )
  async findOne(@Param('id') id: EntityId): Promise<School> {
    return this.schoolService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new school' })
  @ApiCrudResponse(School, 'created')
  async create(
    @Body() createSchoolDto: CreateSchoolDto,
    @CurrentUser() user: UserEntity,
  ): Promise<School> {
    return this.schoolService.adminCreate(
      createSchoolDto as unknown as DeepPartial<School>,
      user,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a school (partially)' })
  @ApiCrudResponse(School)
  async patch(
    @Param('id') id: EntityId,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ): Promise<School> {
    return this.schoolService.update(
      id,
      updateSchoolDto as unknown as DeepPartial<School>,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a school (fully)' })
  @ApiCrudResponse(School)
  async put(
    @Param('id') id: EntityId,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ): Promise<School> {
    return this.schoolService.update(
      id,
      updateSchoolDto as unknown as DeepPartial<School>,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a school' })
  @ApiOkResponse({ description: 'School deleted successfully' })
  @ApiErrorResponses()
  async delete(@Param('id') id: EntityId): Promise<void> {
    return this.schoolService.delete(id);
  }
}
