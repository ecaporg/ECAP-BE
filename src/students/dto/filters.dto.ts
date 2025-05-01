import { IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { BaseFilterDto } from '@/core';
import { IdDecorator } from '@/core/decorators/filter-dto.decorators';
import { RecordStringAndDotNotation } from '@/core/utils/types';

import { SampleEntity } from '../entities/sample.entity';

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
    description: 'Filter by academic year',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'assignment_period.academic_year'?: number;

  @IdDecorator(String)
  @IsString({ each: true })
  'status'?: string[];
}
