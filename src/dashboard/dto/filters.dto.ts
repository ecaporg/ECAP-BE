import { IsNumber, IsOptional } from 'class-validator';

import { BaseFilterDto, RecordStringAndDotNotation } from '@/core';
import { TrackLearningPeriodEntity } from '@/track/entities/track-learning-period.entity';

const FILTER_KEYS = {
  ADMIN: 'track.tenant.admins.id',
  DIRECTOR: 'student_lp_enrollments.student.academy_id',
  TEACHER: 'student_lp_enrollments.teacher_school_year_enrollment.teacher_id',
} satisfies RecordStringAndDotNotation<TrackLearningPeriodEntity>;

export class DashboardFilterDto extends BaseFilterDto {
  @IsOptional()
  @IsNumber()
  [FILTER_KEYS.DIRECTOR]?: number;

  @IsOptional()
  @IsNumber()
  [FILTER_KEYS.ADMIN]?: number;

  @IsOptional()
  @IsNumber()
  [FILTER_KEYS.TEACHER]?: number;
}
