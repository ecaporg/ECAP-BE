import { IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import {
  BaseFilterDto,
  IdDecorator,
  RecordStringAndDotNotation,
} from '../../core';

import { TrackEntity } from '../entities/track.entity';
import { TrackCalendarEntity } from '../entities/track-calendar.entity';

const FILTER_TRACK_KEYS = {
  TENANT_ID: 'tenant_id',
  DIRECTOR_ID: 'tenant.directors.id',
  TEACHER_ID: 'tenant.schools.teacher_school_year_enrollments.teacher_id',
} satisfies RecordStringAndDotNotation<TrackEntity>;

export class TrackFilterDto extends BaseFilterDto {
  @ApiProperty({
    required: true,
    description: 'Filter by tenant ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_TRACK_KEYS.TENANT_ID]: number[];

  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_TRACK_KEYS.DIRECTOR_ID]: number[];

  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_TRACK_KEYS.TEACHER_ID]: number[];
}

const FILTER_TRACK_CALENDAR_KEYS = {
  TENANT_ID: 'track.tenant_id',
  DIRECTOR_ID: 'track.tenant.directors.id',
  TEACHER_ID: 'track.tenant.schools.teacher_school_year_enrollments.teacher_id',
} satisfies RecordStringAndDotNotation<TrackCalendarEntity>;

export class TrackCalendarFilterDto extends BaseFilterDto {
  @ApiProperty({
    required: true,
    description: 'Filter by track ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_TRACK_CALENDAR_KEYS.TENANT_ID]: number[];

  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_TRACK_CALENDAR_KEYS.DIRECTOR_ID]: number[];

  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_TRACK_CALENDAR_KEYS.TEACHER_ID]: number[];
}

export class TrackLearningPeriodFilterDto extends TrackCalendarFilterDto {}

export class TrackSemesterFilterDto extends TrackCalendarFilterDto {}
