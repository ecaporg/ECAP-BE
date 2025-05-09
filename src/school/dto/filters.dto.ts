import { IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { BaseFilterDto, IdDecorator, RecordStringAndDotNotation } from '@/core';

import { SchoolEntity } from '../entities/school.entity';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const keys: RecordStringAndDotNotation<SchoolEntity> = {
  Tenant: 'tenant_id',
} as const;

export class SchoolFilterDto extends BaseFilterDto {
  @ApiProperty({
    required: true,
    description: 'Filter by tenant ID',
    type: [Number],
  })
  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'tenant_id': number[];

  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'tenant.directors.id': number[];

  @IdDecorator(Number)
  @IsNumber({}, { each: true })
  'courses.teacher_id': number[];
}
