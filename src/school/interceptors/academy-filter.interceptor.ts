import { Injectable } from '@nestjs/common';

import { AttachUserIdInterceptor } from '@/core';
import { RolesEnum } from '@/users/enums/roles.enum';

import { AcademyEntity } from '../entities/academy.entity';

@Injectable()
export class AcademyFilterInterceptor extends AttachUserIdInterceptor<AcademyEntity> {
  constructor() {
    super([
      { role: RolesEnum.ADMIN, path: 'tenant_id' },
      { role: RolesEnum.SUPER_ADMIN, path: 'tenant_id' },
      { role: RolesEnum.DIRECTOR, path: 'tenant.directors.id' },
      { role: RolesEnum.TEACHER, path: 'tenant.schools.courses.teacher_id' },
    ]);
  }
}
