import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinDate,
  Validate,
  ValidatorConstraintInterface,
} from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

import { TrackEntity } from '../entities/track.entity';
interface Track extends TrackEntity {}

class EndDateAfterStartDateConstraint implements ValidatorConstraintInterface {
  validate(endDate: Date, args: any) {
    const { object } = args;
    if (object.start_date) return false;
    return endDate > object.start_date;
  }
}

export class CreateTrackDto
  implements Pick<Track, 'name' | 'end_date' | 'start_date'>
{
  @ApiProperty({ description: 'Track name', maxLength: 250 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  name: string;

  @ApiProperty({ description: 'Track end date' })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @Validate(EndDateAfterStartDateConstraint)
  end_date: Date;

  @ApiProperty({ description: 'Track start date' })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date(), {
    message: 'Start date must be after today',
  })
  start_date: Date;

  // tenant_id will be set from the user in the service
}

export class UpdateTrackDto extends PartialType(CreateTrackDto) {}
