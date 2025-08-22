import { Injectable } from '@nestjs/common';

import { AttachUserIdInterceptor } from 'src/core';
import { RolesEnum } from 'src/users/enums/roles.enum';

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
        path: 'schools.teacher_school_year_enrollments.teacher_id',
      },
    ]);
  }
}
