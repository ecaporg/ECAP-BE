import { IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import {
  BaseFilterDto,
  IdDecorator,
  RecordStringAndDotNotation,
} from '../../../core';
import { TrackEntity } from '../entities/track.entity';
import { TrackCalendarEntity } from '../entities/track-calendar.entity';

const FILTER_TRACK_KEYS = {
  ADMIN_ID: 'tenant.admins.id',
  DIRECTOR_ID: 'tenant.directors.id',
  TEACHER_ID: 'tenant.teachers.id',
} satisfies RecordStringAndDotNotation<TrackEntity>;

export class TrackFilterDto extends BaseFilterDto {
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_TRACK_KEYS.ADMIN_ID]: number[];

  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_TRACK_KEYS.DIRECTOR_ID]: number[];

  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_TRACK_KEYS.TEACHER_ID]: number[];
}

const FILTER_TRACK_CALENDAR_KEYS = {
  ADMIN_ID: 'track.tenant.admins.id',
  DIRECTOR_ID: 'track.tenant.directors.id',
  TEACHER_ID: 'track.tenant.teachers.id',
} satisfies RecordStringAndDotNotation<TrackCalendarEntity>;

export class TrackCalendarFilterDto extends BaseFilterDto {
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_TRACK_CALENDAR_KEYS.ADMIN_ID]: number[];

  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_TRACK_CALENDAR_KEYS.DIRECTOR_ID]: number[];

  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_TRACK_CALENDAR_KEYS.TEACHER_ID]: number[];
}

export class TrackLearningPeriodFilterDto extends TrackCalendarFilterDto {}

export class TrackSemesterFilterDto extends TrackCalendarFilterDto {}
