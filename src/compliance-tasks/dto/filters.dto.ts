import { IsBoolean, IsNumber, IsString } from 'class-validator';

import { ApiProperty, OmitType } from '@nestjs/swagger';

import { BaseFilterDto, IdDecorator, RecordStringAndDotNotation } from '@/core';
import { AssignmentPeriodEntity } from '@/school/entities/assignment.entity';

const FILTER_KEYS = {
  LEARNING_PERIOD_ID: 'learning_period_id',
  ACADEMY_ID: 'student.academy_id',
  SCHOOL_ID: 'course.school_id',
  TRACK_ID: 'student.track_id',
  STUDENT_GRADE: 'student.grade',
  COMPLETED: 'completed',
  TEACHER_ID: 'course.teacher_id',
  SAMPLE_STATUS: 'samples.status',
  STUDENT_ID: 'student_id',
  DONE_BY_ID: 'samples.done_by_id',
  ACADEMIC_YEAR: 'course.academic_year_id',
  SEMESTER_ID: 'student.track.semesters.id',
  SAMPLE_SUBJECT: 'samples.subject',
} satisfies RecordStringAndDotNotation<AssignmentPeriodEntity>;

export class StudentsTableFilterDto extends BaseFilterDto {
  @ApiProperty({
    required: true,
    description: 'Filter by learning period ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.LEARNING_PERIOD_ID]: number[];

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
    description: 'Filter by school ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.SCHOOL_ID]?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by track ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.TRACK_ID]?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by grade',
    type: [String],
  })
  @IdDecorator(String)
  @IsString({ each: true })
  [FILTER_KEYS.STUDENT_GRADE]?: string[];

  @ApiProperty({
    required: false,
    description: 'Filter by sample status',
    type: [Boolean],
  })
  @IdDecorator((value: string) => value === 'true')
  @IsBoolean({ each: true })
  [FILTER_KEYS.COMPLETED]?: boolean[];

  @ApiProperty({
    required: false,
    description: 'Filter by teacher ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.TEACHER_ID]?: number;
}

export class StudentSamplesFilterDto extends BaseFilterDto {
  @ApiProperty({
    required: true,
    description: 'Filter by learning period ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.LEARNING_PERIOD_ID]: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by sample status',
    type: [String],
  })
  @IdDecorator(String)
  @IsString({ each: true })
  [FILTER_KEYS.SAMPLE_STATUS]?: string[];

  @ApiProperty({
    required: false,
    description: 'Filter by teacher ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.TEACHER_ID]?: number[];

  @ApiProperty({
    required: true,
    description: 'Filter by student ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.STUDENT_ID]?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by done by ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.DONE_BY_ID]?: number[];

  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.ACADEMY_ID]?: number[];
}

export class TeachersTableFilterDto extends OmitType(StudentsTableFilterDto, [
  FILTER_KEYS.LEARNING_PERIOD_ID,
  FILTER_KEYS.ACADEMY_ID,
]) {
  @ApiProperty({
    required: false,
    description: 'Filter by learning period ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.LEARNING_PERIOD_ID]?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by academic year',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.ACADEMIC_YEAR]?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by semester',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.SEMESTER_ID]?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by sample status',
    type: [String],
  })
  @IdDecorator(String)
  @IsString({ each: true })
  [FILTER_KEYS.SAMPLE_STATUS]?: string[];

  @ApiProperty({
    required: false,
    description: 'Filter by subject',
    type: [String],
  })
  @IdDecorator(String)
  @IsString({ each: true })
  [FILTER_KEYS.SAMPLE_SUBJECT]?: string[];
}
