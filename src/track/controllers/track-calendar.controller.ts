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
} from 'src/core';
import { RolesEnum } from 'src/users/enums/roles.enum';

import { TrackCalendarFilterDto } from '../dto/filters.dto';
import {
  CreateTrackCalendarDto,
  UpdateTrackCalendarDto,
} from '../dto/track-calendar.dto';
import { TrackCalendarEntity } from '../entities/track-calendar.entity';
import { TrackCalendarFilterInterceptor } from '../interceptors/track-calendar-filter.interceptor';
import { TrackCalendarService } from '../services/track-calendar.service';

@ApiTags('Track Calendar')
@Controller('track-calendars')
@UseInterceptors(TrackCalendarFilterInterceptor)
@Roles(RolesEnum.SUPER_ADMIN)
export class TrackCalendarController {
  constructor(private readonly trackCalendarService: TrackCalendarService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks calendar with pagination' })
  @ApiPaginationQueries()
  @ApiPaginatedCrudResponse(TrackCalendarEntity)
  @Roles(
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.DIRECTOR,
    RolesEnum.TEACHER,
  )
  async findAll(
    @Query() options?: TrackCalendarFilterDto,
  ): Promise<PaginatedResult<TrackCalendarEntity>> {
    return this.trackCalendarService.findAll(options);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track calendar by ID' })
  @ApiCrudResponse(TrackCalendarEntity)
  @Roles(
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.DIRECTOR,
    RolesEnum.TEACHER,
  )
  async findOne(@Param('id') id: EntityId): Promise<TrackCalendarEntity> {
    return this.trackCalendarService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new track' })
  @ApiCrudResponse(TrackCalendarEntity, 'created')
  async create(
    @Body() createTrackCalendarDto: CreateTrackCalendarDto,
  ): Promise<TrackCalendarEntity> {
    return this.trackCalendarService.create(createTrackCalendarDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a track calendar (partially)' })
  @ApiCrudResponse(TrackCalendarEntity)
  async patch(
    @Param('id') id: EntityId,
    @Body() updateTrackCalendarDto: UpdateTrackCalendarDto,
  ): Promise<TrackCalendarEntity> {
    return this.trackCalendarService.update(id, updateTrackCalendarDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a track calendar (fully)' })
  @ApiCrudResponse(TrackCalendarEntity)
  async put(
    @Param('id') id: EntityId,
    @Body() updateTrackCalendarDto: UpdateTrackCalendarDto,
  ): Promise<TrackCalendarEntity> {
    return this.trackCalendarService.update(id, updateTrackCalendarDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a track calendar' })
  @ApiOkResponse({ description: 'Track calendar deleted successfully' })
  @ApiErrorResponses()
  async delete(@Param('id') id: EntityId): Promise<void> {
    return this.trackCalendarService.delete(id);
  }
}

