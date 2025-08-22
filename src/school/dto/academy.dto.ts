import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

import { AcademyEntity } from '../entities/academy.entity';

// Basic DTO definitions. Expand these with your actual school properties.
// You might want to use class-validator decorators for validation.

interface Academy extends AcademyEntity {}

export class CreateAcademyDto implements Pick<Academy, 'name'> {
  @ApiProperty({
    description: 'The name of the academy',
    example: 'Greenwood High',
    maxLength: 255,
  })
  @IsString({ message: 'School name must be a string' })
  @IsNotEmpty({ message: 'School name is required' })
  @MaxLength(255, { message: 'School name cannot exceed 255 characters' })
  name: string;

  @ApiProperty({
    description: 'The ID of the tenant',
    example: 1,
  })
  @IsNumber({}, { message: 'Tenant ID must be a number' })
  @IsOptional({ message: 'Tenant ID is required' })
  tenant_id?: number;
}

export class UpdateAcademyDto extends PartialType(CreateAcademyDto) {}

