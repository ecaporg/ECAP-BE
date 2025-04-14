import { Injectable } from '@nestjs/common';

import { IAuthUser } from '@/auth/types/auth-user';
import { extractPaginationOptions } from '@/core/utils/pagination.utils';
import { AcademicYearService } from '@/school/services/academic-year.service';
import { AssignmentService } from '@/school/services/subject-assignment.service';
import { StudentService } from '@/students/services/student.service';
import { TrackLearningPeriodService } from '@/track/services/track-learning-period.service';
import { RolesEnum } from '@/users/enums/roles.enum';

import { StudentsTableFilterDto } from '../dto/filters.dto';

@Injectable()
export class TeacherComplianceTaskService {
  constructor(
    private readonly studentService: StudentService,
    private readonly assignmentService: AssignmentService,
    private readonly academicYearService: AcademicYearService,
    private readonly learningPeriodService: TrackLearningPeriodService,
  ) {}

  async getStudents(filterDTO: StudentsTableFilterDto, user: IAuthUser) {
    // filterDTO['assignment_periods.learning_period_id'] =
    //   filterDTO.learning_period_id;
    delete filterDTO.learning_period_id;
    if (user.role === RolesEnum.TEACHER) {
      filterDTO['teacher_id'] = user.id;
    }

    const paginationOptions = extractPaginationOptions(filterDTO);
    console.log('Pagination options:', paginationOptions);
    console.log('Filter DTO:', filterDTO);

    const subjectAssignments = await this.assignmentService.findAll(
      paginationOptions,
      {
        subject: true,
        teacher: true,
        assignment_periods: {
          learning_period: true,
          samples: true,
          student: true,
        },
      },
    );
    console.log(subjectAssignments);

    return subjectAssignments;
  }
}
