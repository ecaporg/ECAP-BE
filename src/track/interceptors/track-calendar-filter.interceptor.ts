import { Injectable } from '@nestjs/common';

import { AttachUserIdInterceptor } from '@/core';
import { RolesEnum } from '@/users/enums/roles.enum';

import { TrackCalendarEntity } from '../entities/track-calendar.entity';

@Injectable()
export class TrackCalendarFilterInterceptor extends AttachUserIdInterceptor<TrackCalendarEntity> {
  constructor() {
    super([
      { role: RolesEnum.ADMIN, path: 'track.tenant_id' },
      { role: RolesEnum.SUPER_ADMIN, path: 'track.tenant_id' },
      { role: RolesEnum.DIRECTOR, path: 'track.tenant.directors.id' },
      {
        role: RolesEnum.TEACHER,
        path: 'track.tenant.schools.courses.teacher_id',
      },
    ]);
  }
}
