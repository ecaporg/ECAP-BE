import { Injectable } from '@nestjs/common';

import { RolesEnum } from '../../../auth/enums/roles.enum';
import { AttachUserIdInterceptor } from '../../../core';
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
        path: 'tenant.teachers.id',
      },
    ]);
  }
}
