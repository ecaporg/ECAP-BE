import { Type } from '@nestjs/common';

// Auth models
import { AuthUser } from '@/auth/types/auth-user';
import { CourseEntity } from '@/course/entities/course.entity';
import { AcademicYearEntity } from '@/school/entities/academic-year.entity';
// School entities
import { AcademyEntity } from '@/school/entities/academy.entity';
import { AssignmentPeriodEntity } from '@/school/entities/assignment.entity';
import { SchoolEntity } from '@/school/entities/school.entity';
import { SemesterEntity } from '@/school/entities/semester.entity';
// Staff entities
import {
  AdminEntity,
  DirectorEntity,
  TeacherEntity,
} from '@/staff/entities/staff.entity';
// Student entities
import { SampleEntity } from '@/students/entities/sample.entity';
import {
  SampleFlagCompletedEntity,
  SampleFlagErrorEntity,
  SampleFlagMissingWorkEntity,
  SampleFlagRejectedEntity,
} from '@/students/entities/sample-flag.entity';
import { StudentEntity } from '@/students/entities/student.entity';
import { TenantEntity } from '@/tenant/entities/tenant.entity';
// Track entities
import { SubjectEntity } from '@/track/entities/subject.entity';
import { TrackEntity } from '@/track/entities/track.entity';
import { TrackCalendarEntity } from '@/track/entities/track-calendar.entity';
import { TrackLearningPeriodEntity } from '@/track/entities/track-learning-period.entity';
// User entities
import { UserEntity } from '@/users/entities/user.entity';

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
  CourseEntity,
  AssignmentPeriodEntity,
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
