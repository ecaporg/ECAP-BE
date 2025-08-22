import { Injectable } from '@nestjs/common';

import { AttachUserIdInterceptor } from '../../core';
import { RolesEnum } from '../../users/enums/roles.enum';

import { SchoolEntity } from '../entities/school.entity';

@Injectable()
export class SchoolFilterInterceptor extends AttachUserIdInterceptor<SchoolEntity> {
  constructor() {
    super([
      { role: RolesEnum.ADMIN, path: 'tenant_id' },
      { role: RolesEnum.SUPER_ADMIN, path: 'tenant_id' },
      { role: RolesEnum.DIRECTOR, path: 'tenant.directors.id' },
      {
        role: RolesEnum.TEACHER,
        path: 'teacher_school_year_enrollments.teacher_id',
      },
    ]);
  }
}
