import { Injectable } from '@nestjs/common';

import { RolesEnum } from '../../../auth/enums/roles.enum';
import { AttachUserIdInterceptor } from '../../../core/interceptors/attach-user-id.interceptor';
import { TeacherEntity } from '../entities/staff.entity';

@Injectable()
export class TeacherFilterInterceptor extends AttachUserIdInterceptor<TeacherEntity> {
  constructor() {
    super([
      // {
      //   role: RolesEnum.ADMIN,
      //   path: 'teacher_enrollments.school.tenant.admins.id',
      // },
      // {
      //   role: RolesEnum.DIRECTOR,
      //   path: 'teacher_enrollments.school.tenant.directors.id',
      // },
    ]);
  }
}
