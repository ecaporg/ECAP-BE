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

export enum SortDirectionEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

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

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  sortBy?: string[];

  @ApiProperty({
    required: false,
    enum: ['ASC', 'DESC'],
    default: ['ASC'],
    isArray: true,
  })
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  @IsEnum(SortDirectionEnum, { each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  sortDirection?: SortDirectionEnum[] = [SortDirectionEnum.ASC];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;
}
