import { IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { BaseFilterDto, IdDecorator, RecordStringAndDotNotation } from '@/core';

import { TenantEntity } from '../entities/tenant.entity';

const FILTER_KEYS = {
  ADMIN_ID: 'admins.id',
  DIRECTOR_ID: 'directors.id',
  TEACHER_ID: 'schools.teacher_school_year_enrollments.teacher_id',
} satisfies RecordStringAndDotNotation<TenantEntity>;

export class TenantKeyFilterDto extends BaseFilterDto {
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.ADMIN_ID]: number[];

  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.DIRECTOR_ID]: number[];

  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.TEACHER_ID]: number[];
}
