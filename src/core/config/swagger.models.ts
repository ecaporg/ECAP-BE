import { Type } from '@nestjs/common';

// Auth models
import { AuthTokensDTO } from '@/auth/dtos/auth-tokens.dto';
import { EmailDTO } from '@/auth/dtos/email.dto';
import { LoginResponseDTO } from '@/auth/dtos/login-response.dto';
import { PasswordDTO } from '@/auth/dtos/password.dto';
import { ResetPasswordDTO } from '@/auth/dtos/reset-password.dto';
import { SignInDTO } from '@/auth/dtos/sign-in.dto';
import { AuthUser } from '@/auth/types/auth-user';
import { CourseEntity } from '@/course/entities/course.entity';
import { DashboardStatsResponseDto } from '@/dashboard/dto/dashboard-stats.dto';
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
// User models
import { CreateUserDTO } from '@/users/dtos/create-user.dto';
import { UpdateUserDTO } from '@/users/dtos/update-user.dto';
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
  AuthTokensDTO,
  LoginResponseDTO,
  AuthUser,
  EmailDTO,
  PasswordDTO,
  ResetPasswordDTO,
  SignInDTO,

  // Users
  CreateUserDTO,
  UpdateUserDTO,
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

  DashboardStatsResponseDto,
];
