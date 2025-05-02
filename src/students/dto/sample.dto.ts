import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

import { SampleEntity, SampleStatus } from '../entities/sample.entity';

interface SampleInterface extends SampleEntity {}
export class CreateSampleDto implements Partial<SampleInterface> {
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

  @ApiProperty({ description: 'User ID associated with this sample' })
  @IsNumber()
  @IsNotEmpty()
  done_by_id: number;
}

export class UpdateSampleDto extends PartialType(CreateSampleDto) {}

export class CreateSampleFlagErrorDto {
  @ApiProperty({ description: 'Comment' })
  @IsString()
  @IsNotEmpty()
  comment: string;
}

export class CreateSampleFlagMissingWorkDto {
  @ApiProperty({ description: 'Reason' })
  @IsString()
  @IsNotEmpty()
  reason: string;
}

export class CreateSampleFlagRejectedDto {
  @ApiProperty({ description: 'Reason' })
  @IsString()
  @IsNotEmpty()
  reason: string;
}
