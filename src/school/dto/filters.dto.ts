import { IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import {
  BaseFilterDto,
  IdDecorator,
  RecordStringAndDotNotation,
} from '../../core';
import { AcademyEntity } from '../entities/academy.entity';
import { SchoolEntity } from '../entities/school.entity';

const FILTER_SCHOOL_KEYS = {
  TENANT_ID: 'tenant_id',
  DIRECTOR_ID: 'tenant.directors.id',
  TEACHER_ID: 'teacher_school_year_enrollments.teacher_id',
} satisfies RecordStringAndDotNotation<SchoolEntity>;

export class SchoolFilterDto extends BaseFilterDto {
  @ApiProperty({
    required: true,
    description: 'Filter by tenant ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_SCHOOL_KEYS.TENANT_ID]: number[];

  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_SCHOOL_KEYS.DIRECTOR_ID]: number[];

  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_SCHOOL_KEYS.TEACHER_ID]: number[];
}

const FILTER_ACADEMY_KEYS = {
  TENANT_ID: 'tenant_id',
  DIRECTOR_ID: 'tenant.directors.id',
  TEACHER_ID: 'tenant.schools.teacher_school_year_enrollments.teacher_id',
} satisfies RecordStringAndDotNotation<AcademyEntity>;

export class AcademyFilterDto extends BaseFilterDto {
  @ApiProperty({
    required: true,
    description: 'Filter by tenant ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_ACADEMY_KEYS.TENANT_ID]: number[];

  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_ACADEMY_KEYS.DIRECTOR_ID]: number[];

  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_ACADEMY_KEYS.TEACHER_ID]: number[];
}
