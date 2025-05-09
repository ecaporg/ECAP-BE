import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

import { TrackEntity } from '../entities/track.entity';

interface Track extends TrackEntity {}

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
  @IsDate()
  end_date: Date;

  @ApiProperty({ description: 'Track start date' })
  @IsNotEmpty()
  @IsDate()
  start_date: Date;

  // tenant_id will be set from the user in the service
}

export class UpdateTrackDto extends PartialType(CreateTrackDto) {}
