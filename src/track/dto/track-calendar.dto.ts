import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

import { TrackCalendarEntity } from '../entities/track-calendar.entity';
interface TrackCalendar extends TrackCalendarEntity {}

export class CalendarDayDto {
  @ApiProperty({ description: 'Calendar day' })
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  day: Date;

  @ApiProperty({ description: 'Calendar type' })
  @IsNotEmpty()
  @IsString()
  type: string;
}

export class CreateTrackCalendarDto
  implements Pick<TrackCalendar, 'days' | 'id'>
{
  @ApiProperty({ description: 'Track calendar days' })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CalendarDayDto)
  days: CalendarDayDto[];

  @ApiProperty({ description: 'Track ID' })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class UpdateTrackCalendarDto extends PartialType(
  CreateTrackCalendarDto,
) {}
