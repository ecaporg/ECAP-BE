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

import {
  ApiCrudResponse,
  ApiErrorResponses,
  ApiPaginatedCrudResponse,
  ApiPaginationQueries,
  EntityId,
  PaginatedResult,
  PaginationOptions,
  Roles,
} from '@/core';
import { RolesEnum } from '@/users/enums/roles.enum';

import { CreateSampleDto, UpdateSampleDto } from '../dto/sample.dto';
import { SampleEntity } from '../entities/sample.entity';
import { SampleService } from '../services/sample.service';

@ApiTags('samples')
@Controller('samples')
@Roles(
  RolesEnum.ADMIN,
  RolesEnum.TEACHER,
  RolesEnum.DIRECTOR,
  RolesEnum.SUPER_ADMIN,
)
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all samples with pagination' })
  @ApiPaginationQueries()
  @ApiPaginatedCrudResponse(SampleEntity)
  async findAll(
    @Query() options?: PaginationOptions,
  ): Promise<PaginatedResult<SampleEntity>> {
    return this.sampleService.findAll(options);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sample by ID' })
  @ApiCrudResponse(SampleEntity)
  async findOne(@Param('id') id: EntityId): Promise<SampleEntity> {
    return this.sampleService.findOne(id, {
      assignment_period: {
        learning_period: {
          track: true,
        },
        student: {
          user: true,
        },
      },
      done_by: true,
      subject: true,
    });
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
}
