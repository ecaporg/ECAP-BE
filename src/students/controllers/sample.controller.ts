import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  ApiCrudResponse,
  ApiErrorResponses,
  ApiPaginatedCrudResponse,
  ApiPaginationQueries,
  AttachUserIdInterceptor,
  CurrentUser,
  EntityId,
  PaginatedResult,
  PaginationOptions,
  Roles,
} from 'src/core';
import { UserEntity } from 'src/users/entities/user.entity';
import { RolesEnum } from 'src/users/enums/roles.enum';

import { FlaggedSamplesFilterDto } from '../dto/filters.dto';
import {
  CreateSampleDto,
  CreateSampleFlagCompletedDto,
  CreateSampleFlagErrorDto,
  CreateSampleFlagMissingWorkDto,
  CreateSampleFlagRejectedDto,
  UpdateSampleDto,
} from '../dto/sample.dto';
import { SampleEntity } from '../entities/sample.entity';
import {
  SampleFlagCompletedEntity,
  SampleFlagErrorEntity,
  SampleFlagMissingWorkEntity,
  SampleFlagRejectedEntity,
} from '../entities/sample-flag.entity';
import { SampleService } from '../services/sample.service';

const DefaultRoles = [
  RolesEnum.ADMIN,
  RolesEnum.TEACHER,
  RolesEnum.SUPER_ADMIN,
];

@ApiTags('Samples')
@Controller('samples')
@Roles(...DefaultRoles)
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all samples with pagination' })
  @ApiPaginationQueries()
  @ApiPaginatedCrudResponse(SampleEntity)
  @Roles(...DefaultRoles, RolesEnum.DIRECTOR)
  async findAll(
    @Query() options?: PaginationOptions,
  ): Promise<PaginatedResult<SampleEntity>> {
    return this.sampleService.findAll(options);
  }

  @UseInterceptors(
    new AttachUserIdInterceptor<SampleEntity>([
      {
        role: RolesEnum.DIRECTOR,
        path: 'student_lp_enrollments.student.academy_id',
        map: (user) => user.director?.academy?.id,
      },
      {
        role: RolesEnum.TEACHER,
        path: 'student_lp_enrollments.teacher_school_year_enrollment.teacher_id',
      },
    ]),
  )
  @Get('flagged')
  @ApiOperation({ summary: 'Get all flagged samples' })
  @ApiPaginationQueries()
  @ApiPaginatedCrudResponse(SampleEntity)
  @Roles(...DefaultRoles, RolesEnum.DIRECTOR)
  async getFlaggedSamples(@Query() options?: FlaggedSamplesFilterDto) {
    return this.sampleService.getFlaggedSamples(options);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sample by ID' })
  @ApiCrudResponse(SampleEntity)
  @Roles(...DefaultRoles, RolesEnum.DIRECTOR)
  async findOne(@Param('id') id: EntityId): Promise<SampleEntity> {
    return this.sampleService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new sample' })
  @ApiCrudResponse(SampleEntity, 'created')
  async create(@Body() createDto: CreateSampleDto): Promise<SampleEntity> {
    return this.sampleService.create(createDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a sample' })
  @ApiCrudResponse(SampleEntity)
  async update(
    @Param('id') id: EntityId,
    @Body() updateDto: UpdateSampleDto,
  ): Promise<SampleEntity> {
    return this.sampleService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sample' })
  @ApiOkResponse({ description: 'Sample deleted successfully' })
  @ApiErrorResponses()
  async delete(@Param('id') id: EntityId): Promise<void> {
    return this.sampleService.delete(id);
  }

  @Post(':id/flag-error')
  @ApiOperation({ summary: 'Flag an error in a sample' })
  @ApiCrudResponse(SampleFlagErrorEntity)
  async flagError(
    @CurrentUser('id') user_id: UserEntity['id'],
    @Param('id', ParseIntPipe) id: SampleFlagErrorEntity['id'],
    @Body() createDto: CreateSampleFlagErrorDto,
  ): Promise<SampleFlagErrorEntity> {
    return this.sampleService.flagError(id, user_id, createDto);
  }

  @Post(':id/flag-missing-work')
  @ApiOperation({ summary: 'Flag missing work in a sample' })
  @ApiCrudResponse(SampleFlagMissingWorkEntity)
  async flagMissingWork(
    @CurrentUser('id') user_id: UserEntity['id'],
    @Param('id', ParseIntPipe) id: SampleFlagMissingWorkEntity['id'],
    @Body() createDto: CreateSampleFlagMissingWorkDto,
  ): Promise<SampleFlagMissingWorkEntity> {
    return this.sampleService.flagMissingWork(id, user_id, createDto);
  }

  @Post(':id/flag-rejected')
  @ApiOperation({ summary: 'Flag a rejected sample' })
  @ApiCrudResponse(SampleFlagRejectedEntity)
  async flagRejected(
    @CurrentUser('id') user_id: UserEntity['id'],
    @Param('id', ParseIntPipe) id: SampleFlagRejectedEntity['id'],
    @Body() createDto: CreateSampleFlagRejectedDto,
  ): Promise<SampleFlagRejectedEntity> {
    return this.sampleService.flagRejected(id, user_id, createDto);
  }

  @Post(':id/flag-completed')
  @ApiOperation({ summary: 'Flag a completed sample' })
  @ApiCrudResponse(SampleFlagCompletedEntity)
  async flagCompleted(
    @CurrentUser('id') user_id: UserEntity['id'],
    @Param('id', ParseIntPipe) id: SampleFlagCompletedEntity['id'],
    @Body() createDto: CreateSampleFlagCompletedDto,
  ): Promise<SampleFlagCompletedEntity> {
    return this.sampleService.flagCompleted(id, user_id, createDto);
  }
}
