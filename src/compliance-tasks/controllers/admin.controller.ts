import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Roles } from '@/core';
import { RolesEnum } from '@/users/enums/roles.enum';

import { AdminComplianceService } from '../services/admin.service';

@ApiTags('Admin Compliance')
@Controller('admin-compliance')
@Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
export class AdminComplianceController {
  constructor(
    private readonly adminComplianceService: AdminComplianceService,
  ) {}
}
