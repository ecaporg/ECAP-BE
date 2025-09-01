import { Type } from '@nestjs/common';

// Auth models
import { AuthUser } from '../../auth/types/auth-user';
import { StudentLPEnrollmentEntity } from '../../domain/enrollment/entities/student-enrollment.entity';
import { TeacherSchoolYearEnrollmentEntity } from '../../domain/enrollment/entities/teacher-enrollment.entity';
// School entities
import { AcademyEntity } from '../../domain/school/entities/academy.entity';
import { SchoolEntity } from '../../domain/school/entities/school.entity';
// Staff entities
import {
  AdminEntity,
  DirectorEntity,
  TeacherEntity,
} from '../../domain/staff/entities/staff.entity';
// Student entities
import { SampleEntity } from '../../domain/students/entities/sample.entity';
import {
  SampleFlagCompletedEntity,
  SampleFlagErrorEntity,
  SampleFlagMissingWorkEntity,
  SampleFlagRejectedEntity,
} from '../../domain/students/entities/sample-flag.entity';
import { StudentEntity } from '../../domain/students/entities/student.entity';
import { TenantEntity } from '../../domain/tenant/entities/tenant.entity';
import { AcademicYearEntity } from '../../domain/track/entities/academic-year.entity';
import { SemesterEntity } from '../../domain/track/entities/semester.entity';
// Track entities
import { SubjectEntity } from '../../domain/track/entities/subject.entity';
import { TrackEntity } from '../../domain/track/entities/track.entity';
import { TrackCalendarEntity } from '../../domain/track/entities/track-calendar.entity';
import { TrackLearningPeriodEntity } from '../../domain/track/entities/track-learning-period.entity';
// User entities
import { UserEntity } from '../../domain/users/entities/user.entity';
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
