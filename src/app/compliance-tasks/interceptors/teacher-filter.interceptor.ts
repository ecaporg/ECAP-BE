import { Injectable } from '@nestjs/common';

import { AttachUserIdInterceptor } from '../../../core/interceptors/attach-user-id.interceptor';
import { StudentLPEnrollmentEntity } from '../../../domain/enrollment/entities/student-enrollment.entity';
import { RolesEnum } from '../../../auth/enums/roles.enum';

@Injectable()
export class TeacherFilterInterceptor extends AttachUserIdInterceptor<StudentLPEnrollmentEntity> {
  constructor() {
    super([
      {
        role: RolesEnum.TEACHER,
        path: 'teacher_school_year_enrollments.teacher_id',
      },
      {
        role: RolesEnum.DIRECTOR,
        path: 'student.academy_id',
        map: (user) => user.director?.academy?.id,
      },
    ]);
  }
}
