import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiCrudResponse, extractPaginationOptions, Roles } from '@/core';
import { RolesEnum } from '@/users/enums/roles.enum';

import { TenantKeyFilterDto } from '../dto/filters.dto';
import { KeyEntity } from '../entities/key.entity';
import { TenantKeyFilterInterceptor } from '../interceptors/tenant-key-filter.interceptor';
import { KeyService } from '../services/key.service';
import { TenantService } from '../services/tenant.service';

@ApiTags('Tenant Keys')
@Controller('tenant-keys')
export class KeyController {
  constructor(
    private readonly service: KeyService,
    private readonly tenantService: TenantService,
  ) {}

  @Get('access-token')
  @ApiOperation({ summary: 'Get access token' })
  @ApiCrudResponse(KeyEntity)
  @UseInterceptors(TenantKeyFilterInterceptor)
  @Roles(
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.DIRECTOR,
    RolesEnum.TEACHER,
  )
  async getAccessToken(@Query() filter: TenantKeyFilterDto) {
    const tenant = await this.tenantService.findOneBy(
      extractPaginationOptions(filter).filters,
      {
        key: true,
      },
    );

    return tenant.key;
  }

  @Post('refresh-session-token')
  @ApiOperation({ summary: 'Refresh session token' })
  @ApiCrudResponse(KeyEntity)
  @UseInterceptors(TenantKeyFilterInterceptor)
  @Roles(
    RolesEnum.SUPER_ADMIN,
    RolesEnum.ADMIN,
    RolesEnum.DIRECTOR,
    RolesEnum.TEACHER,
  )
  async refreshSessionToken(
    @Query() filter: TenantKeyFilterDto,
    @Body() body: { session_token: string },
  ) {
    const tenant = await this.tenantService.findOneBy(
      extractPaginationOptions(filter).filters,
      {
        key: true,
      },
    );

    return this.service.refreshSessionToken(tenant, body.session_token);
  }
}
