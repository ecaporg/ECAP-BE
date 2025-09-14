import { TenantEntity } from '../../../domain/tenant/entities/tenant.entity';
import { AcademicYearEntity } from '../../../domain/track/entities/academic-year.entity';

import { CanvasAssignmentDto } from './canvas-assignment.dto';
import { CanvasCourseDto } from './canvas-course.dto';
import { CanvasEnrollmentDto } from './canvas-enrolment.dto';
import { CanvasSubmissionDto } from './canvas-submission.dto';
import { CanvasUserDto } from './canvas-user.dto';

export class ProcessCourseDto {
  tenant: TenantEntity;
  currentAcademicYear: AcademicYearEntity;
  course: CanvasCourseDto;
  assignments: CanvasAssignmentDto[];
  teachers: CanvasUserDto[];
  students: CanvasUserDto[];
}

export class ProcessErrorDto {
  tenant: TenantEntity;
  domain: string;
  event: any;
  error: Error;
}

export class ProcessSubmissionDto {
  tenant: TenantEntity;
  currentAcademicYear: AcademicYearEntity;
  assignment: CanvasAssignmentDto;
  course: CanvasCourseDto;
  teachers: CanvasUserDto[];
  user: CanvasUserDto;
  submission: CanvasSubmissionDto;
}
