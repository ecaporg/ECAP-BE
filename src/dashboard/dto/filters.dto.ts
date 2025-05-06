import { IsNumber, IsOptional } from 'class-validator';

import { BaseFilterDto, RecordStringAndDotNotation } from '@/core';
import { TrackLearningPeriodEntity } from '@/track/entities/track-learning-period.entity';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const keys: RecordStringAndDotNotation<TrackLearningPeriodEntity> = {
  DIRECTOR: 'assignment_periods.student.academy.directors.id',
  ADMIN: 'track.tenant.admins.id',
  TEACHER: 'assignment_periods.course.teacher_id',
} as const;

export class DashboardFilterDto extends BaseFilterDto {
  @IsOptional()
  @IsNumber()
  'track.tenant.admins.id'?: number;

  @IsOptional()
  @IsNumber()
  'assignment_periods.student.academy.directors.id'?: number;

  @IsOptional()
  @IsNumber()
  'assignment_periods.course.teacher_id'?: number;
}
