import { Injectable } from '@nestjs/common';

import { RolesEnum } from '../../../auth/enums/roles.enum';
import { AttachUserIdInterceptor } from '../../../core';
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
        path: 'track.tenant.teachers.id',
      },
    ]);
  }
}
