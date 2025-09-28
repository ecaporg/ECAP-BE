import { Injectable } from '@nestjs/common';

import { RolesEnum } from '../../../auth/enums/roles.enum';
import { AttachUserIdInterceptor } from '../../../core';
import { StudentEntity } from '../../../domain/students/entities/student.entity';

@Injectable()
export class StudentSearchFilterInterceptor extends AttachUserIdInterceptor<StudentEntity> {
  constructor() {
    super([
      { role: RolesEnum.ADMIN, path: 'school.tenant.admins.id' },
      { role: RolesEnum.SUPER_ADMIN, path: 'school.tenant.admins.id' },
      { role: RolesEnum.DIRECTOR, path: 'school.tenant.directors.id' },
      {
        role: RolesEnum.TEACHER,
        path: 'school.tenant.teachers.id',
      },
    ]);
  }
}
