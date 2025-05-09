import { Injectable } from '@nestjs/common';

import { AttachToBodyInterceptor, AttachUserIdInterceptor } from '@/core';
import { RolesEnum } from '@/users/enums/roles.enum';

import { SchoolEntity } from '../entities/school.entity';

@Injectable()
export class SchoolFilterInterceptor extends AttachUserIdInterceptor<SchoolEntity> {
  constructor() {
    super([
      { role: RolesEnum.ADMIN, path: 'tenant_id' },
      { role: RolesEnum.SUPER_ADMIN, path: 'tenant_id' },
      { role: RolesEnum.DIRECTOR, path: 'tenant.directors.id' },
      { role: RolesEnum.TEACHER, path: 'courses.teacher_id' },
    ]);
  }
}

@Injectable()
export class AttachTenantIdInterceptor extends AttachToBodyInterceptor<SchoolEntity> {
  constructor() {
    super([{ role: RolesEnum.SUPER_ADMIN, path: 'tenant_id' }]);
  }
}
