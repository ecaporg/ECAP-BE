import { IsNumber } from 'class-validator';

import { BaseFilterDto, IdDecorator, RecordStringAndDotNotation } from '@/core';
import { AssignmentPeriodEntity } from '@/school/entities/assignment.entity';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const keys: RecordStringAndDotNotation<AssignmentPeriodEntity> = {
  DIRECTOR: 'student.academy.directors.id',
  ADMIN: 'course.teacher_id',
  STUDENT_STATUS: 'samples.status',
  SUBJECT: 'course.assignment_periods.samples.subject',
} as const;

export class DashboardFilterDto extends BaseFilterDto {
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'course.teacher_id'?: number;

  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'student.academy.directors.id'?: number[];
}
