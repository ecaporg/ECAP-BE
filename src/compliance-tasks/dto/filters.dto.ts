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
  'assignment_periods.learning_period_id': number[];

  @ApiProperty({
    required: false,
    description: 'Filter by academy ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'assignment_periods.student.academy_id'?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by school ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'school_id'?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by track ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'assignment_periods.student.track_id'?: number[];

  @ApiProperty({
    required: false,
    description: 'Filter by grade',
    type: [String],
  })
  @IdDecorator(String)
  @IsString({ each: true })
  'assignment_periods.student.grade'?: string[];

  @ApiProperty({
    required: false,
    description: 'Filter by sample status',
    type: [Boolean],
  })
  @IdDecorator(Boolean)
  @IsBoolean({ each: true })
  'assignment_periods.completed'?: boolean[];
}
