import { IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import {
  BaseFilterDto,
  DEFAULT_FILTERS_KEYS,
  getFilterMappingRecord,
  IdDecorator,
  RecordStringAndDotNotation,
} from '../../../core';
import { SampleEntity, SampleFlagCategory } from '../entities/sample.entity';

const FILTER_KEYS = {
  LEARNING_PERIOD_ID:
    'student_lp_enrollment_assignment.student_lp_enrollment.learning_period_id',
  TEACHER_ID:
    'student_lp_enrollment_assignment.student_lp_enrollment.teacher_school_year_enrollments.teacher_id',
  ACADEMY_ID:
    'student_lp_enrollment_assignment.student_lp_enrollment.student.academy_id',
  ACADEMIC_YEAR:
    'student_lp_enrollment_assignment.student_lp_enrollment.teacher_school_year_enrollments.academic_year_id',
  STATUS: 'status',
  FLAG_CATEGORY: 'flag_category',
} satisfies RecordStringAndDotNotation<SampleEntity>;

export const filterMapping = getFilterMappingRecord(FILTER_KEYS);

export class FlaggedSamplesFilterDto extends BaseFilterDto {
  @ApiProperty({
    required: false,
    description: 'Filter by learning period ID',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.LEARNING_PERIOD_ID]: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by teacher ID',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.TEACHER_ID,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.TEACHER_ID]?: number;

  @ApiProperty({
    required: false,
    description: 'Filter by academy ID',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.ACADEMY_ID,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.ACADEMY_ID]?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by academic year',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.ACADEMIC_YEAR]?: number;

  @ApiProperty({
    required: false,
    description: 'Filter by status',
    type: [String],
    name: DEFAULT_FILTERS_KEYS.STATUS,
  })
  @IdDecorator(String)
  @IsString({ each: true })
  [FILTER_KEYS.STATUS]?: string[];

  @ApiProperty({
    required: false,
    description: 'Filter by flag category',
    type: [String],
    name: DEFAULT_FILTERS_KEYS.FLAG_CATEGORY,
  })
  @IdDecorator(String)
  @IsString({ each: true })
  [FILTER_KEYS.FLAG_CATEGORY]?: string[] = [
    SampleFlagCategory.REASON_REJECTED,
    SampleFlagCategory.ERROR_IN_SAMPLE,
    SampleFlagCategory.MISSING_SAMPLE,
  ];
}
