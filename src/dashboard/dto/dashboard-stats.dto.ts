import { ApiProperty } from '@nestjs/swagger';

import { AcademicYearEntity } from 'src/track/entities/academic-year.entity';
import { TrackLearningPeriodEntity } from 'src/track/entities/track-learning-period.entity';

export class DashboardStatItemDto {
  @ApiProperty({
    description: 'Learning period',
    type: TrackLearningPeriodEntity,
  })
  learningPeriods: TrackLearningPeriodEntity[];

  @ApiProperty({
    description: 'Compliance',
    type: Number,
  })
  compliance: number;

  @ApiProperty({
    description: 'Status',
    type: Boolean,
  })
  completed: boolean;
}

export class AcademyStatItemDto {
  @ApiProperty({
    description: 'Academy id',
    type: String,
  })
  academy_id: string;

  @ApiProperty({
    description: 'Academy name',
    type: String,
  })
  academy_name: string;

  @ApiProperty({
    description: 'Academy compliance',
    type: Number,
  })
  compliance: number;

  @ApiProperty({
    description: 'Academy year to date compliance',
    type: Number,
  })
  yearToDateCompliance: number;
}

export class DashboardStatsResponseDto {
  @ApiProperty({
    description: 'Learning periods before the previous one',
    type: DashboardStatItemDto,
  })
  beforeThePreviousOne: DashboardStatItemDto;

  @ApiProperty({
    description: 'Previous learning periods',
    type: DashboardStatItemDto,
  })
  previousLP?: DashboardStatItemDto;

  @ApiProperty({
    description: 'Current learning periods',
    type: DashboardStatItemDto,
  })
  currentLP: DashboardStatItemDto;

  @ApiProperty({
    description: 'Upcoming learning periods',
    type: DashboardStatItemDto,
  })
  upcomingLP: DashboardStatItemDto;

  @ApiProperty({
    description: 'Academic year',
    type: AcademicYearEntity,
  })
  academicYear: AcademicYearEntity;

  @ApiProperty({
    description: 'Year to date compliance',
    type: Number,
  })
  yearToDateCompliance?: number;

  @ApiProperty({
    description: 'Academy to date compliance',
    type: AcademyStatItemDto,
  })
  academies?: AcademyStatItemDto[];
}
