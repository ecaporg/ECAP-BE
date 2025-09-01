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
import { TrackLearningPeriodFilterDto } from '../dto/filters.dto';
import {
  CreateTrackLearningPeriodDto,
  UpdateTrackLearningPeriodDto,
} from '../dto/track-learning-period.dto';
import { TrackLearningPeriodEntity } from '../entities/track-learning-period.entity';
import { TrackLearningPeriodFilterInterceptor } from '../interceptors/track-learning-period-filter.interceptor';
import { TrackLearningPeriodService } from '../services/track-learning-period.service';

@ApiTags('Track Learning Period')
@Controller('track-learning-periods')
@UseInterceptors(TrackLearningPeriodFilterInterceptor)
@Roles(RolesEnum.SUPER_ADMIN)
export class TrackLearningPeriodController {
  constructor(
    private readonly trackLearningPeriodService: TrackLearningPeriodService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks learning periods with pagination' })
  @ApiPaginationQueries()
  @ApiPaginatedCrudResponse(TrackLearningPeriodEntity)
  @Roles(
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.DIRECTOR,
    RolesEnum.TEACHER,
  )
  async findAll(
    @Query() options?: TrackLearningPeriodFilterDto,
  ): Promise<PaginatedResult<TrackLearningPeriodEntity>> {
    return this.trackLearningPeriodService.findAll(options);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track learning period by ID' })
  @ApiCrudResponse(TrackLearningPeriodEntity)
  @Roles(
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.DIRECTOR,
    RolesEnum.TEACHER,
  )
  async findOne(@Param('id') id: EntityId): Promise<TrackLearningPeriodEntity> {
    return this.trackLearningPeriodService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new track learning period' })
  @ApiCrudResponse(TrackLearningPeriodEntity, 'created')
  async create(
    @Body() createTrackLearningPeriodDto: CreateTrackLearningPeriodDto,
  ): Promise<TrackLearningPeriodEntity> {
    return this.trackLearningPeriodService.create(createTrackLearningPeriodDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updat e a track learning period (partially)' })
  @ApiCrudResponse(TrackLearningPeriodEntity)
  async patch(
    @Param('id') id: EntityId,
    @Body() updateTrackLearningPeriodDto: UpdateTrackLearningPeriodDto,
  ): Promise<TrackLearningPeriodEntity> {
    return this.trackLearningPeriodService.update(
      id,
      updateTrackLearningPeriodDto,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a track learning period (fully)' })
  @ApiCrudResponse(TrackLearningPeriodEntity)
  async put(
    @Param('id') id: EntityId,
    @Body() updateTrackLearningPeriodDto: UpdateTrackLearningPeriodDto,
  ): Promise<TrackLearningPeriodEntity> {
    return this.trackLearningPeriodService.update(
      id,
      updateTrackLearningPeriodDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a track learning period' })
  @ApiOkResponse({ description: 'Track learning period deleted successfully' })
  @ApiErrorResponses()
  async delete(@Param('id') id: EntityId): Promise<void> {
    return this.trackLearningPeriodService.delete(id);
  }
}
