import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { BaseFilterDto } from '@/core';

export class StudentsTableFilterDto extends BaseFilterDto {
  @ApiProperty({ required: true, description: 'Filter by learning period ID' })
  @IsNumber()
  learning_period_id: number;

  @ApiProperty({ required: false, description: 'Filter by academy ID' })
  @IsOptional()
  @IsNumber()
  'student.academy_id'?: number;

  @ApiProperty({ required: false, description: 'Filter by school ID' })
  @IsOptional()
  @IsNumber()
  'student.school_id'?: number;

  @ApiProperty({ required: false, description: 'Filter by track ID' })
  @IsOptional()
  @IsNumber()
  'student.track_id'?: number;

  @ApiProperty({ required: false, description: 'Filter by grade' })
  @IsOptional()
  @IsString()
  'student.grade'?: string;

  @ApiProperty({ required: false, description: 'Filter by sample status' })
  @IsOptional()
  @IsBoolean()
  'learning_periods.completed'?: boolean;
}
