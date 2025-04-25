import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { BaseFilterDto } from '@/core';

function IdDecorator(Obj: any) {
  return applyDecorators(
    Transform(({ value }) =>
      typeof value === 'string'
        ? value.split(',').map(Obj)
        : Array.isArray(value)
          ? value.map(Obj)
          : [Obj(value)],
    ),
    IsArray(),
    IsOptional(),
  );
}

export class StudentsTableFilterDto extends BaseFilterDto {
  @ApiProperty({
    required: true,
    description: 'Filter by learning period ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'learning_period_id': number[];

  @ApiProperty({
    required: false,
    description: 'Filter by academy ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'student.academy_id'?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by school ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'course.school_id'?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by track ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'student.track_id'?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by grade',
    type: [String],
  })
  @IdDecorator(String)
  @IsString({ each: true })
  'student.grade'?: string[];

  @ApiProperty({
    required: false,
    description: 'Filter by sample status',
    type: [Boolean],
  })
  @IdDecorator((value: string) => value === 'true')
  @IsBoolean({ each: true })
  'completed'?: boolean[];

  @ApiProperty({
    required: false,
    description: 'Filter by teacher ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'course.teacher_id'?: number;
}

export class StudentSamplesFilterDto extends BaseFilterDto {
  @ApiProperty({
    required: true,
    description: 'Filter by learning period ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'learning_period_id': number[];

  @ApiProperty({
    required: false,
    description: 'Filter by sample status',
    type: [String],
  })
  @IdDecorator(String)
  @IsString({ each: true })
  'samples.status'?: string[];

  @ApiProperty({
    required: false,
    description: 'Filter by teacher ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'course.teacher_id'?: number[];

  @ApiProperty({
    required: true,
    description: 'Filter by student ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'student_id'?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by done by ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'samples.done_by_id'?: number[];
}
