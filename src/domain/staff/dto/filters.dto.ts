import { IsNumber } from 'class-validator';

import {
  BaseFilterDto,
  IdDecorator,
  RecordStringAndDotNotation,
} from '../../../core';
import { TeacherEntity } from '../entities/staff.entity';

const FILTER_KEYS = {
  ADMIN_ID: 'teacher_school_year_enrollments.school.tenant.admins.id',
  DIRECTOR_ID: 'teacher_school_year_enrollments.school.tenant.directors.id',
} satisfies RecordStringAndDotNotation<TeacherEntity>;

export class TeachersFilterDto extends BaseFilterDto {
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.ADMIN_ID]: number[];

  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  [FILTER_KEYS.DIRECTOR_ID]: number[];
}
