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
  EntityId,
  PaginatedResult,
  Roles,
} from '../../../core';
import { RolesEnum } from '../../users/enums/roles.enum';
import { TrackSemesterFilterDto } from '../dto/filters.dto';
import {
  CreateTrackSemesterDto,
  UpdateTrackSemesterDto,
} from '../dto/track-semester.dto';
import { SemesterEntity } from '../entities/semester.entity';
import { TrackSemesterFilterInterceptor } from '../interceptors/track-semester-filter.interceptor';
import { SemesterService } from '../services/semester.service';

@ApiTags('Track Semesters')
@Controller('track-semesters')
@UseInterceptors(TrackSemesterFilterInterceptor)
@Roles(RolesEnum.SUPER_ADMIN)
export class TrackSemesterController {
  constructor(private readonly semesterService: SemesterService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks semesters with pagination' })
  @ApiPaginationQueries()
  @ApiPaginatedCrudResponse(SemesterEntity)
  @Roles(
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.DIRECTOR,
    RolesEnum.TEACHER,
  )
  async findAll(
    @Query() options?: TrackSemesterFilterDto,
  ): Promise<PaginatedResult<SemesterEntity>> {
    return this.semesterService.findAll(options);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track semester by ID' })
  @ApiCrudResponse(SemesterEntity)
  @Roles(
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.DIRECTOR,
    RolesEnum.TEACHER,
  )
  async findOne(@Param('id') id: EntityId): Promise<SemesterEntity> {
    return this.semesterService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new track semester' })
  @ApiCrudResponse(SemesterEntity, 'created')
  async create(
    @Body() createTrackSemesterDto: CreateTrackSemesterDto,
  ): Promise<SemesterEntity> {
    return this.semesterService.create(createTrackSemesterDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a track semester (partially)' })
  @ApiCrudResponse(SemesterEntity)
  async patch(
    @Param('id') id: EntityId,
    @Body() updateTrackSemesterDto: UpdateTrackSemesterDto,
  ): Promise<SemesterEntity> {
    return this.semesterService.update(id, updateTrackSemesterDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a track semester (fully)' })
  @ApiCrudResponse(SemesterEntity)
  async put(
    @Param('id') id: EntityId,
    @Body() updateTrackSemesterDto: UpdateTrackSemesterDto,
  ): Promise<SemesterEntity> {
    return this.semesterService.update(id, updateTrackSemesterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a track learning period' })
  @ApiOkResponse({ description: 'Track learning period deleted successfully' })
  @ApiErrorResponses()
  async delete(@Param('id') id: EntityId): Promise<void> {
    return this.semesterService.delete(id);
  }
}
