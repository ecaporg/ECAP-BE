import { Injectable } from '@nestjs/common';

import { AttachUserIdInterceptor } from '../../../core';
import { RolesEnum } from '../../../auth/enums/roles.enum';
import { AcademyEntity } from '../entities/academy.entity';

@Injectable()
export class AcademyFilterInterceptor extends AttachUserIdInterceptor<AcademyEntity> {
  constructor() {
    super([
      { role: RolesEnum.ADMIN, path: 'tenant.admins.id' },
      { role: RolesEnum.SUPER_ADMIN, path: 'tenant.admins.id' },
      { role: RolesEnum.DIRECTOR, path: 'tenant.directors.id' },
      {
        role: RolesEnum.TEACHER,
        path: 'tenant.schools.teacher_school_year_enrollments.teacher_id',
      },
    ]);
  }
}
