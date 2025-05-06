import { IsBoolean, IsNumber, IsString } from 'class-validator';

import { ApiProperty, OmitType } from '@nestjs/swagger';

import { BaseFilterDto, IdDecorator, RecordStringAndDotNotation } from '@/core';
import { AssignmentPeriodEntity } from '@/school/entities/assignment.entity';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const keys: RecordStringAndDotNotation<AssignmentPeriodEntity> = {
  DIRECTOR: 'student.academy.directors.id',
  ADMIN: 'course.teacher_id',
  STUDENT_STATUS: 'samples.status',
  SUBJECT: 'course.assignment_periods.samples.subject',
} as const;

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

  @ApiProperty({
    required: false,
    description: 'Filter by director ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'student.academy.directors.id'?: number[];
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

export class TeachersTableFilterDto extends OmitType(StudentsTableFilterDto, [
  'learning_period_id',
]) {
  @ApiProperty({
    required: false,
    description: 'Filter by learning period ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'learning_period_id'?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by academic year',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'course.academic_year'?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by semester',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'course.academic_year.semesters'?: number[];

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
    description: 'Filter by subject',
    type: [String],
  })
  @IdDecorator(String)
  @IsString({ each: true })
  'samples.subject'?: string[];
}
