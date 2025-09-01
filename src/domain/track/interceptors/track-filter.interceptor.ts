import { Injectable } from '@nestjs/common';

import { AttachUserIdInterceptor } from '../../../core';
import { RolesEnum } from '../../users/enums/roles.enum';
import { TrackEntity } from '../entities/track.entity';

@Injectable()
export class TrackFilterInterceptor extends AttachUserIdInterceptor<TrackEntity> {
  constructor() {
    super([
      { role: RolesEnum.ADMIN, path: 'tenant_id' },
      { role: RolesEnum.SUPER_ADMIN, path: 'tenant_id' },
      { role: RolesEnum.DIRECTOR, path: 'tenant.directors.id' },
      {
        role: RolesEnum.TEACHER,
        path: 'tenant.schools.teacher_school_year_enrollments.teacher_id',
      },
    ]);
  }
}
