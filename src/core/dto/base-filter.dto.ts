import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import {
  FILTER_SEPARATOR_FOR_MULTIPLE_VALUES,
  SortDirectionEnum,
} from '../constants';
import { IdDecorator } from '../decorators/filter-dto.decorators';

export class BaseFilterDto {
  @ApiProperty({ required: false, default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ required: false, default: 10, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 15;

  @ApiProperty({ required: false, type: [String], default: ['updatedAt'] })
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  @Transform(({ value }) =>
    typeof value === 'string'
      ? value.split(FILTER_SEPARATOR_FOR_MULTIPLE_VALUES)
      : value,
  )
  sortBy?: string[];

  @ApiProperty({
    required: false,
    enum: SortDirectionEnum,
    default: ['ASC'],
    isArray: true,
  })
  @IdDecorator(SortDirectionEnum)
  @IsEnum({ each: true })
  sortDirection?: SortDirectionEnum[];

  @ApiProperty({ required: false, description: 'Search query' })
  @IsOptional()
  @IsString()
  search?: string;

  @IdDecorator(String)
  @IsString({ each: true })
  searchFields?: string[];
}
