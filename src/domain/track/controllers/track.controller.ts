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

import { UserEntity } from '../../../auth/entities/user.entity';
import { RolesEnum } from '../../../auth/enums/roles.enum';
import {
  ApiCrudResponse,
  ApiErrorResponses,
  ApiPaginatedCrudResponse,
  ApiPaginationQueries,
  CurrentUser,
  EntityId,
  PaginatedResult,
  Roles,
} from '../../../core';
import { TrackFilterDto } from '../dto/filters.dto'; // Using TrackFilterDto
import { CreateTrackDto, UpdateTrackDto } from '../dto/track.dto';
import { TrackEntity } from '../entities/track.entity';
import { TrackFilterInterceptor } from '../interceptors/track-filter.interceptor';
import { TrackService } from '../services/track.service';

@ApiTags('Tracks')
@Controller('tracks')
@UseInterceptors(TrackFilterInterceptor)
@Roles(RolesEnum.SUPER_ADMIN)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks with pagination' })
  @ApiPaginationQueries()
  @ApiPaginatedCrudResponse(TrackEntity)
  @Roles(
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.DIRECTOR,
    RolesEnum.TEACHER,
  )
  async findAll(
    @Query() options?: TrackFilterDto,
  ): Promise<PaginatedResult<TrackEntity>> {
    return this.trackService.findAll(options);
  }

  @Get('/periods')
  @ApiOperation({
    summary: 'Get all tracks with learning periods with pagination',
  })
  @ApiPaginationQueries()
  @ApiPaginatedCrudResponse(TrackEntity)
  @Roles(
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.DIRECTOR,
    RolesEnum.TEACHER,
  )
  async findAllPeriods(
    @Query() options?: TrackFilterDto,
  ): Promise<PaginatedResult<TrackEntity>> {
    return this.trackService.findAll(options, {
      learningPeriods: true,
    });
  }

  @Get('/semesters')
  @ApiOperation({
    summary: 'Get all tracks with semesters with pagination',
  })
  @ApiPaginationQueries()
  @ApiPaginatedCrudResponse(TrackEntity)
  @Roles(
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.DIRECTOR,
    RolesEnum.TEACHER,
  )
  async findAllSemesters(
    @Query() options?: TrackFilterDto,
  ): Promise<PaginatedResult<TrackEntity>> {
    return this.trackService.findAll(options, {
      semesters: true,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track by ID' })
  @ApiCrudResponse(TrackEntity)
  @Roles(
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.DIRECTOR,
    RolesEnum.TEACHER,
  )
  async findOne(@Param('id') id: EntityId): Promise<TrackEntity> {
    return this.trackService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new track' })
  @ApiCrudResponse(TrackEntity, 'created')
  async create(
    @Body() createTrackDto: CreateTrackDto,
    @CurrentUser() user: UserEntity,
  ): Promise<TrackEntity> {
    return this.trackService.adminCreate(createTrackDto, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a track (partially)' })
  @ApiCrudResponse(TrackEntity)
  async patch(
    @Param('id') id: EntityId,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    return this.trackService.update(id, updateTrackDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a track (fully)' })
  @ApiCrudResponse(TrackEntity)
  async put(
    @Param('id') id: EntityId,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a track' })
  @ApiOkResponse({ description: 'Track deleted successfully' })
  @ApiErrorResponses()
  async delete(@Param('id') id: EntityId): Promise<void> {
    return this.trackService.delete(id);
  }
}
