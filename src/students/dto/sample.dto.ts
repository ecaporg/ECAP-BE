import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

import { SampleStatus } from '../entities/sample.entity';

export class CreateSampleDto {
  @ApiProperty({ description: 'Assignment title', maxLength: 250 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  assignment_title: string;

  @ApiProperty({
    description: 'Sample status',
    enum: SampleStatus,
    default: SampleStatus.PENDING,
  })
  @IsEnum(SampleStatus)
  @IsOptional()
  status?: SampleStatus = SampleStatus.PENDING;

  @ApiProperty({
    description: 'Assignment period ID associated with this sample',
  })
  @IsNumber()
  @IsNotEmpty()
  assignment_period_id: number;

  @ApiProperty({ description: 'Subject ID associated with this sample' })
  @IsNumber()
  @IsNotEmpty()
  subject_id: number;
}

export class UpdateSampleDto extends PartialType(CreateSampleDto) {}
