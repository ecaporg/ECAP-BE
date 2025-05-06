import { ApiProperty } from '@nestjs/swagger';

import { TrackLearningPeriodEntity } from '@/track/entities/track-learning-period.entity';

export class DashboardStatsDto {
  @ApiProperty({
    description: 'Learning periods before the previous one',
    type: [TrackLearningPeriodEntity],
    required: false,
  })
  beforeThePreviousOne?: TrackLearningPeriodEntity[];

  @ApiProperty({
    description: 'Previous learning periods',
    type: [TrackLearningPeriodEntity],
    required: false,
  })
  previousLP?: TrackLearningPeriodEntity[];

  @ApiProperty({
    description: 'Current learning periods',
    type: [TrackLearningPeriodEntity],
  })
  currentLP: TrackLearningPeriodEntity[];

  @ApiProperty({
    description: 'Upcoming learning periods',
    type: [TrackLearningPeriodEntity],
  })
  upcomingLP: TrackLearningPeriodEntity[];
}
