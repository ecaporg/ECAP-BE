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
import { StudentLPEnrollmentAssignmentEntity } from '../../../domain/enrollment/entities/student-enrollment-assignment.entity';

const FILTER_KEYS = {
  LEARNING_PERIOD_ID: 'learning_period_id',
  ACADEMY_ID: 'student.academy_id',
  SCHOOL_ID: 'teacher_school_year_enrollments.school_id',
  TRACK_ID: 'learning_period.track_id',
  STUDENT_GRADE: 'student_grade',
  COMPLETED: 'completed',
  TEACHER_ID: 'teacher_school_year_enrollments.teacher_id',
  STATUS: 'assignments.sample.status',
  STUDENT_ID: 'student_id',
  DONE_BY_ID: 'assignments.sample.done_by_id',
  ACADEMIC_YEAR: 'teacher_school_year_enrollments.academic_year_id',
  SEMESTER_ID: 'learning_period.track.semesters.id',
  SUBJECT_ID: 'assignments.assignment.course_id',
} satisfies RecordStringAndDotNotation<StudentLPEnrollmentEntity>;

const ASSIGNMENT_FILTER_KEYS = {
  LEARNING_PERIOD_ID: 'student_lp_enrollment.learning_period_id',
  ACADEMIC_YEAR:
    'student_lp_enrollment.teacher_school_year_enrollments.academic_year_id',
  SEMESTER_ID: 'student_lp_enrollment.learning_period.track.semesters.id',
  STATUS: 'sample.status',
  STUDENT_ID: 'student_lp_enrollment.student_id',
  DONE_BY_ID: 'sample.done_by_id',
  SUBJECT_ID: 'assignment.course_id',

  ACADEMY_ID: 'student_lp_enrollment.student.academy_id',
  SCHOOL_ID: 'student_lp_enrollment.teacher_school_year_enrollments.school_id',
  TRACK_ID: 'student_lp_enrollment.learning_period.track_id',
  STUDENT_GRADE: 'student_lp_enrollment.student_grade',
  COMPLETED: 'student_lp_enrollment.completed',
  TEACHER_ID:
    'student_lp_enrollment.teacher_school_year_enrollments.teacher_id',
} satisfies RecordStringAndDotNotation<StudentLPEnrollmentAssignmentEntity>;

export const filterMapping = getFilterMappingRecord(FILTER_KEYS);
export const assignmentFilterMapping = getFilterMappingRecord(
  ASSIGNMENT_FILTER_KEYS,
);

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
    name: DEFAULT_FILTERS_KEYS.STATUS,
  })
  @IdDecorator(String)
  @IsString({ each: true })
  [FILTER_KEYS.STATUS]?: string[];

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

export class TeachersTableFilterDto extends BaseFilterDto {
  @ApiProperty({
    required: false,
    description: 'Filter by academy ID',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.ACADEMY_ID,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [ASSIGNMENT_FILTER_KEYS.ACADEMY_ID]?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by school ID',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.SCHOOL_ID,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [ASSIGNMENT_FILTER_KEYS.SCHOOL_ID]?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by track ID',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.TRACK_ID,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [ASSIGNMENT_FILTER_KEYS.TRACK_ID]?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by grade',
    type: [String],
    name: DEFAULT_FILTERS_KEYS.STUDENT_GRADE,
  })
  @IdDecorator(String)
  @IsString({ each: true })
  [ASSIGNMENT_FILTER_KEYS.STUDENT_GRADE]?: string[];

  @ApiProperty({
    required: false,
    description: 'Filter by sample status',
    type: [Boolean],
    name: DEFAULT_FILTERS_KEYS.COMPLETED,
  })
  @IdDecorator((value: string) => value === 'true')
  @IsBoolean({ each: true })
  [ASSIGNMENT_FILTER_KEYS.COMPLETED]?: boolean[];

  @ApiProperty({
    required: false,
    description: 'Filter by teacher ID',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.TEACHER_ID,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [ASSIGNMENT_FILTER_KEYS.TEACHER_ID]?: number;

  @ApiProperty({
    required: false,
    description: 'Filter by learning period ID',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [ASSIGNMENT_FILTER_KEYS.LEARNING_PERIOD_ID]?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by academic year',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [ASSIGNMENT_FILTER_KEYS.ACADEMIC_YEAR]?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by semester',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.SEMESTER_ID,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [ASSIGNMENT_FILTER_KEYS.SEMESTER_ID]?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by sample status',
    type: [String],
    name: DEFAULT_FILTERS_KEYS.STATUS,
  })
  @IdDecorator(String)
  @IsString({ each: true })
  [ASSIGNMENT_FILTER_KEYS.STATUS]?: string[];

  @ApiProperty({
    required: false,
    description: 'Filter by subject',
    type: [Number],
    name: DEFAULT_FILTERS_KEYS.SUBJECT_ID,
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [ASSIGNMENT_FILTER_KEYS.SUBJECT_ID]?: number[];
}
