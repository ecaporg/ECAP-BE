import { IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { BaseFilterDto, IdDecorator, RecordStringAndDotNotation } from '@/core';

import { SampleEntity, SampleFlagCategory } from '../entities/sample.entity';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const keys: RecordStringAndDotNotation<SampleEntity> = {
  LearningPeriod: 'assignment_period',
  Teacher: 'assignment_period.course.teacher_id',
  Student: 'assignment_period.course.academic_year_id',
} as const;

export class FlaggedSamplesFilterDto extends BaseFilterDto {
  @ApiProperty({
    required: false,
    description: 'Filter by learning period ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'assignment_period.learning_period_id': number[];

  @ApiProperty({
    required: false,
    description: 'Filter by teacher ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'assignment_period.course.teacher_id'?: number;

  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'assignment_period.student.academy.directors.id'?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by academy ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'assignment_period.student.academy_id'?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by academic year',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'assignment_period.academic_year'?: number;

  @ApiProperty({
    required: false,
    description: 'Filter by status',
    type: [String],
  })
  @IdDecorator(String)
  @IsString({ each: true })
  'status'?: string[];

  @ApiProperty({
    required: false,
    description: 'Filter by flag category',
    type: [String],
  })
  @IdDecorator(String)
  @IsString({ each: true })
  'flag_category'?: string[] = [
    SampleFlagCategory.REASON_REJECTED,
    SampleFlagCategory.ERROR_IN_SAMPLE,
    SampleFlagCategory.MISSING_SAMPLE,
  ];
}
