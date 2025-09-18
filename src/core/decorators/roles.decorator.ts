import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

import { EmailVerifiedGuard } from '../../auth/guards/email-verified.guard';
import { RolesEnum } from '../../auth/enums/roles.enum';
import { RoleGuard, ROLES_KEY } from '../guards/role.guard';

export function Roles(...roles: RolesEnum[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(AuthGuard('jwt'), EmailVerifiedGuard, RoleGuard),
    ApiBearerAuth(),
  );
}
