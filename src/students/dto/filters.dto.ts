import { IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { BaseFilterDto, IdDecorator, RecordStringAndDotNotation } from '@/core';

import { SampleEntity, SampleFlagCategory } from '../entities/sample.entity';

const FILTER_KEYS = {
  LEARNING_PERIOD_ID: 'student_lp_enrollments.learning_period_id',
  TEACHER_ID:
    'student_lp_enrollments.teacher_school_year_enrollment.teacher_id',
  ACADEMY_ID: 'student_lp_enrollments.student.academy_id',
  ACADEMIC_YEAR:
    'student_lp_enrollments.teacher_school_year_enrollment.academic_year_id',
  STATUS: 'status',
  FLAG_CATEGORY: 'flag_category',
} satisfies RecordStringAndDotNotation<SampleEntity>;

export class FlaggedSamplesFilterDto extends BaseFilterDto {
  @ApiProperty({
    required: false,
    description: 'Filter by learning period ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.LEARNING_PERIOD_ID]: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by teacher ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.TEACHER_ID]?: number;

  @ApiProperty({
    required: false,
    description: 'Filter by academy ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.ACADEMY_ID]?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by academic year',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.ACADEMIC_YEAR]?: number;

  @ApiProperty({
    required: false,
    description: 'Filter by status',
    type: [String],
  })
  @IdDecorator(String)
  @IsString({ each: true })
  [FILTER_KEYS.STATUS]?: string[];

  @ApiProperty({
    required: false,
    description: 'Filter by flag category',
    type: [String],
  })
  @IdDecorator(String)
  @IsString({ each: true })
  [FILTER_KEYS.FLAG_CATEGORY]?: string[] = [
    SampleFlagCategory.REASON_REJECTED,
    SampleFlagCategory.ERROR_IN_SAMPLE,
    SampleFlagCategory.MISSING_SAMPLE,
  ];
}
