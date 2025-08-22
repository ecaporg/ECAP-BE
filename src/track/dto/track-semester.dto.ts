import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

import { SemesterEntity } from '../entities/semester.entity';

interface TrackSemester extends SemesterEntity {}

export class CreateTrackSemesterDto
  implements
    Pick<TrackSemester, 'track_id' | 'start_date' | 'end_date' | 'name'>
{
  @ApiProperty({ description: 'Semester name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Track ID' })
  @IsNotEmpty()
  @IsNumber()
  track_id: number;

  @ApiProperty({ description: 'Start date' })
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  start_date: Date;

  @ApiProperty({ description: 'End date' })
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  end_date: Date;
}

export class UpdateTrackSemesterDto extends PartialType(
  CreateTrackSemesterDto,
) {}

