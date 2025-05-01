import { Injectable } from '@nestjs/common';

import { AssignmentPeriodEntity } from '@/school/entities/assignment.entity';
import { RolesEnum } from '@/users/enums/roles.enum';

import { AttachUserIdInterceptor } from '../../core/interceptors/attach-user-id.interceptor';

@Injectable()
export class TeacherFilterInterceptor extends AttachUserIdInterceptor<AssignmentPeriodEntity> {
  constructor() {
    super([
      { role: RolesEnum.TEACHER, path: 'course.teacher_id' },
      { role: RolesEnum.DIRECTOR, path: 'student.academy.directors.id' },
    ]);
  }
}
