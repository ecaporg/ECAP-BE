import { IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { BaseFilterDto, IdDecorator, RecordStringAndDotNotation } from '@/core';

import { TrackEntity } from '../entities/track.entity';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const keys: RecordStringAndDotNotation<TrackEntity> = {
  Tenant: 'tenant_id',
  Teacher: 'tenant.schools.courses.teacher_id',
} as const;

export class TrackFilterDto extends BaseFilterDto {
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
  'tenant.schools.courses.teacher_id': number[];
}
