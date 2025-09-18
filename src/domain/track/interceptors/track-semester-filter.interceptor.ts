import { Injectable } from '@nestjs/common';

import { AttachUserIdInterceptor } from '../../../core';
import { RolesEnum } from '../../../auth/enums/roles.enum';
import { SemesterEntity } from '../entities/semester.entity';

@Injectable()
export class TrackSemesterFilterInterceptor extends AttachUserIdInterceptor<SemesterEntity> {
  constructor() {
    super([
      { role: RolesEnum.ADMIN, path: 'track.tenant.admins.id' },
      { role: RolesEnum.SUPER_ADMIN, path: 'track.tenant.admins.id' },
      { role: RolesEnum.DIRECTOR, path: 'track.tenant.directors.id' },
      {
        role: RolesEnum.TEACHER,
        path: 'track.tenant.schools.teacher_school_year_enrollments.teacher_id',
      },
    ]);
  }
}
