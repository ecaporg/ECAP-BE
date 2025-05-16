import { IsNumber, IsOptional } from 'class-validator';

import { BaseFilterDto, RecordStringAndDotNotation } from '@/core';
import { TrackLearningPeriodEntity } from '@/track/entities/track-learning-period.entity';

const FILTER_KEYS = {
  DIRECTOR: 'track.tenant.admins.id',
  ADMIN: 'assignment_periods.student.academy_id',
  TEACHER: 'assignment_periods.course.teacher_id',
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
