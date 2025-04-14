import { Injectable } from '@nestjs/common';

import { IAuthUser } from '@/auth/types/auth-user';
import { extractPaginationOptions } from '@/core/utils/pagination.utils';
import { AcademicYearService } from '@/school/services/academic-year.service';
import { SubjectAssignmentService } from '@/school/services/subject-assignment.service';
import { StudentService } from '@/students/services/student.service';
import { TrackLearningPeriodService } from '@/track/services/track-learning-period.service';

import { StudentsTableFilterDto } from '../dto/filters.dto';

@Injectable()
export class TeacherComplianceTaskService {
  constructor(
    private readonly studentService: StudentService,
    private readonly subjectAssignmentService: SubjectAssignmentService,
    private readonly academicYearService: AcademicYearService,
    private readonly learningPeriodService: TrackLearningPeriodService,
  ) {}

  async getStudents(filterDTO: StudentsTableFilterDto, user: IAuthUser) {
    filterDTO['learning_periods.learning_period_id'] =
      filterDTO.learning_period_id;
    filterDTO['teacher_id'] = user.id;

    const paginationOptions = extractPaginationOptions(filterDTO);
    console.log(paginationOptions, filterDTO);
    const subjectAssignments = await this.subjectAssignmentService.findAll(
      paginationOptions,
      [
        'students',
        'subjects',
        'samples',
        'academies',
        'schools',
        'tracks',
        'subject_assignment_learning_periods',
      ],
    );
    console.log(subjectAssignments);

    return subjectAssignments;
  }
}
