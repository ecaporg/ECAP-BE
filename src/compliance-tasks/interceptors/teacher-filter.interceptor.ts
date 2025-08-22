import { Injectable } from '@nestjs/common';

import { AttachUserIdInterceptor } from '../../core/interceptors/attach-user-id.interceptor';
import { StudentLPEnrollmentEntity } from '../../enrollment/entities/student-enrollment.entity';
import { RolesEnum } from '../../users/enums/roles.enum';

@Injectable()
export class TeacherFilterInterceptor extends AttachUserIdInterceptor<StudentLPEnrollmentEntity> {
  constructor() {
    super([
      {
        role: RolesEnum.TEACHER,
        path: 'teacher_school_year_enrollment.teacher_id',
      },
      {
        role: RolesEnum.DIRECTOR,
        path: 'student.academy_id',
        map: (user) => user.director?.academy?.id,
      },
    ]);
  }
}
