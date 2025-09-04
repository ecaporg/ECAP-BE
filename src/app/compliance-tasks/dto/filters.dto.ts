import { IsBoolean, IsNumber, IsString } from 'class-validator';

import { ApiProperty, OmitType } from '@nestjs/swagger';

import {
  BaseFilterDto,
  DEFAULT_FILTERS_KEYS,
  getFilterMappingRecord,
  IdDecorator,
  RecordStringAndDotNotation,
} from '../../../core';
import { StudentLPEnrollmentEntity } from '../../../domain/enrollment/entities/student-enrollment.entity';

const FILTER_KEYS = {
  LEARNING_PERIOD_ID: 'learning_period_id',
  ACADEMY_ID: 'student.academy_id',
  SCHOOL_ID: 'teacher_school_year_enrollments.school_id',
  TRACK_ID: 'learning_period.track_id',
  STUDENT_GRADE: 'student_grade',
  COMPLETED: 'completed',
  TEACHER_ID: 'teacher_school_year_enrollments.teacher_id',
  SAMPLE_STATUS: 'assignments.sample.status',
  STUDENT_ID: 'student_id',
  DONE_BY_ID: 'assignments.sample.done_by_id',
  ACADEMIC_YEAR: 'teacher_school_year_enrollments.academic_year_id',
  SEMESTER_ID: 'learning_period.track.semesters.id',
  SAMPLE_SUBJECT: 'assignments.sample.subject.id',
} satisfies RecordStringAndDotNotation<StudentLPEnrollmentEntity>;

export const filterMapping = getFilterMappingRecord(FILTER_KEYS);

export class StudentsTableFilterDto extends BaseFilterDto {
  @ApiProperty({
    required: true,
    description: 'Filter by learning period ID',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.LEARNING_PERIOD_ID]: number[];

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
    description: 'Filter by school ID',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.SCHOOL_ID,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.SCHOOL_ID]?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by track ID',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.TRACK_ID,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.TRACK_ID]?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by grade',
    type: [String],
    name: DEFAULT_FILTERS_KEYS.STUDENT_GRADE,
  })
  @IdDecorator(String)
  @IsString({ each: true })
  [FILTER_KEYS.STUDENT_GRADE]?: string[];

  @ApiProperty({
    required: false,
    description: 'Filter by sample status',
    type: [Boolean],
    name: DEFAULT_FILTERS_KEYS.COMPLETED,
  })
  @IdDecorator((value: string) => value === 'true')
  @IsBoolean({ each: true })
  [FILTER_KEYS.COMPLETED]?: boolean[];

  @ApiProperty({
    required: false,
    description: 'Filter by teacher ID',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.TEACHER_ID,
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
    name: DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.LEARNING_PERIOD_ID]: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by sample status',
    type: [String],
    name: DEFAULT_FILTERS_KEYS.SAMPLE_STATUS,
  })
  @IdDecorator(String)
  @IsString({ each: true })
  [FILTER_KEYS.SAMPLE_STATUS]?: string[];

  @ApiProperty({
    required: false,
    description: 'Filter by teacher ID',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.TEACHER_ID,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.TEACHER_ID]?: number[];

  @ApiProperty({
    required: true,
    description: 'Filter by student ID',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.STUDENT_ID,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.STUDENT_ID]?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by done by ID',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.DONE_BY,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.DONE_BY_ID]?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by academy ID',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.ACADEMY_ID,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.ACADEMY_ID]?: number[];
}

export class TeachersTableFilterDto extends OmitType(StudentsTableFilterDto, [
  FILTER_KEYS.LEARNING_PERIOD_ID,
]) {
  @ApiProperty({
    required: false,
    description: 'Filter by learning period ID',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.LEARNING_PERIOD_ID]?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by academic year',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.ACADEMIC_YEAR]?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by semester',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.SEMESTER,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.SEMESTER_ID]?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by sample status',
    type: [String],
    name: DEFAULT_FILTERS_KEYS.SAMPLE_STATUS,
  })
  @IdDecorator(String)
  @IsString({ each: true })
  [FILTER_KEYS.SAMPLE_STATUS]?: string[];

  @ApiProperty({
    required: false,
    description: 'Filter by subject',
    type: [String],
    name: DEFAULT_FILTERS_KEYS.SUBJECT,
  })
  @IdDecorator(String)
  @IsString({ each: true })
  [FILTER_KEYS.SAMPLE_SUBJECT]?: string[];
}
