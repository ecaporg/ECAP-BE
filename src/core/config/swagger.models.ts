import { Type } from '@nestjs/common';

// Auth models
import { AuthUser } from 'src/auth/types/auth-user';
import { StudentLPEnrollmentEntity } from 'src/enrollment/entities/student-enrollment.entity';
import { TeacherSchoolYearEnrollmentEntity } from 'src/enrollment/entities/teacher-enrollment.entity';
// School entities
import { AcademyEntity } from 'src/school/entities/academy.entity';
import { SchoolEntity } from 'src/school/entities/school.entity';
// Staff entities
import {
  AdminEntity,
  DirectorEntity,
  TeacherEntity,
} from 'src/staff/entities/staff.entity';
// Student entities
import { SampleEntity } from 'src/students/entities/sample.entity';
import {
  SampleFlagCompletedEntity,
  SampleFlagErrorEntity,
  SampleFlagMissingWorkEntity,
  SampleFlagRejectedEntity,
} from 'src/students/entities/sample-flag.entity';
import { StudentEntity } from 'src/students/entities/student.entity';
import { TenantEntity } from 'src/tenant/entities/tenant.entity';
import { AcademicYearEntity } from 'src/track/entities/academic-year.entity';
import { SemesterEntity } from 'src/track/entities/semester.entity';
// Track entities
import { SubjectEntity } from 'src/track/entities/subject.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { TrackCalendarEntity } from 'src/track/entities/track-calendar.entity';
import { TrackLearningPeriodEntity } from 'src/track/entities/track-learning-period.entity';
// User entities
import { UserEntity } from 'src/users/entities/user.entity';

// Core models
import { ErrorResponseDto } from '../dto/error-response.dto';

/**
 * Registry of all models used in Swagger documentation
 * Add all your DTOs, entities, and other models here
 */
export const SWAGGER_API_MODELS: Type<any>[] = [
  // Core
  ErrorResponseDto,

  // Auth
  AuthUser,

  // Users
  UserEntity,

  // School
  AcademyEntity,
  AcademicYearEntity,
  SchoolEntity,
  SemesterEntity,
  TeacherSchoolYearEnrollmentEntity,
  StudentLPEnrollmentEntity,
  TenantEntity,

  // Track
  SubjectEntity,
  TrackCalendarEntity,
  TrackLearningPeriodEntity,
  TrackEntity,

  // Staff
  DirectorEntity,
  AdminEntity,
  TeacherEntity,

  // Students
  SampleEntity,
  StudentEntity,
  SampleFlagErrorEntity,
  SampleFlagMissingWorkEntity,
  SampleFlagRejectedEntity,
  SampleFlagCompletedEntity,
];
