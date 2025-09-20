import { Injectable } from '@nestjs/common';

import { RolesEnum } from '../../../auth/enums/roles.enum';
import { AttachUserIdInterceptor } from '../../../core';
import { TenantEntity } from '../entities/tenant.entity';

@Injectable()
export class TenantKeyFilterInterceptor extends AttachUserIdInterceptor<TenantEntity> {
  constructor() {
    super([
      { role: RolesEnum.ADMIN, path: 'admins.id' },
      { role: RolesEnum.SUPER_ADMIN, path: 'admins.id' },
      { role: RolesEnum.DIRECTOR, path: 'directors.id' },
      {
        role: RolesEnum.TEACHER,
        path: 'teachers.id',
      },
    ]);
  }
}
