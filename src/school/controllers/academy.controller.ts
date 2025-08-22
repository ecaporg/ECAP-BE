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
} from 'src/core';
import { UserEntity } from 'src/users/entities/user.entity';
import { RolesEnum } from 'src/users/enums/roles.enum';

import { CreateAcademyDto, UpdateAcademyDto } from '../dto/academy.dto';
import { SchoolFilterDto } from '../dto/filters.dto';
import { AcademyEntity as Academy } from '../entities/academy.entity';
import { AcademyFilterInterceptor } from '../interceptors/academy-filter.interceptor';
import { AcademyService } from '../services/academy.service';

@ApiTags('Academies')
@Controller('academies')
@UseInterceptors(AcademyFilterInterceptor)
@Roles(RolesEnum.SUPER_ADMIN)
export class AcademyController {
  constructor(private readonly academyService: AcademyService) {}

  @Get()
  @ApiOperation({ summary: 'Get all academies with pagination' })
  @ApiPaginationQueries()
  @ApiPaginatedCrudResponse(Academy)
  @Roles(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.DIRECTOR)
  async findAll(
    @Query() options?: SchoolFilterDto,
  ): Promise<PaginatedResult<Academy>> {
    return this.academyService.findAll(options);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get academy by ID' })
  @ApiCrudResponse(Academy)
  @Roles(
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.DIRECTOR,
    RolesEnum.TEACHER,
  )
  async findOne(@Param('id') id: EntityId): Promise<Academy> {
    return this.academyService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new academy' })
  @ApiCrudResponse(Academy, 'created')
  async create(
    @Body() createAcademyDto: CreateAcademyDto,
    @CurrentUser() user: UserEntity,
  ): Promise<Academy> {
    return this.academyService.adminCreate(createAcademyDto, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a academy (partially)' })
  @ApiCrudResponse(Academy)
  async patch(
    @Param('id') id: EntityId,
    @Body() updateAcademyDto: UpdateAcademyDto,
  ): Promise<Academy> {
    return this.academyService.update(id, updateAcademyDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a academy (fully)' })
  @ApiCrudResponse(Academy)
  async put(
    @Param('id') id: EntityId,
    @Body() updateAcademyDto: UpdateAcademyDto,
  ): Promise<Academy> {
    return this.academyService.update(id, updateAcademyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a academy' })
  @ApiOkResponse({ description: 'Academy deleted successfully' })
  @ApiErrorResponses()
  async delete(@Param('id') id: EntityId): Promise<void> {
    return this.academyService.delete(id);
  }
}

