import { ITrack } from 'ecap-lib/dist/domain';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  Relation,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { TenantGenericEntity } from '../../../core';
import { TenantEntity } from '../../tenant/entities/tenant.entity';

import { AcademicYearEntity } from './academic-year.entity';
import { SemesterEntity } from './semester.entity';
import { TrackCalendarEntity } from './track-calendar.entity';
import { TrackLearningPeriodEntity } from './track-learning-period.entity';

@Entity({ name: 'tracks' })
export class TrackEntity extends TenantGenericEntity implements ITrack {
  @ApiProperty({ description: 'Track name', maxLength: 250 })
  @Column({ length: 250 })
  name: string;

  @ApiProperty({ description: 'Track start date' })
  @Column({ type: 'date' })
  start_date: Date;

  @ApiProperty({ description: 'Track end date' })
  @Column({ type: 'date' })
  end_date: Date;

  @ApiProperty({
    description: 'Academic year ID associated with this track',
  })
  @Column()
  academic_year_id: number;

  @ApiProperty({
    description: 'Tenant associated with this track',
    type: () => TenantEntity,
  })
  @ManyToOne(() => TenantEntity, (tenant) => tenant.tracks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Relation<TenantEntity>;

  @ApiProperty({
    description: 'Academic year associated with this track',
    type: () => AcademicYearEntity,
  })
  @ManyToOne(() => AcademicYearEntity, (academicYear) => academicYear.tracks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'academic_year_id' })
  academicYear: Relation<AcademicYearEntity>;

  @ApiProperty({
    description: 'Calendar entries for this track',
    type: () => TrackCalendarEntity,
  })
  @OneToOne(() => TrackCalendarEntity, (calendar) => calendar.track)
  calendar: Relation<TrackCalendarEntity>;

  @ApiProperty({
    description: 'Learning periods in this track',
    type: () => [{}],
  })
  @OneToMany(() => TrackLearningPeriodEntity, (period) => period.track)
  learningPeriods: Relation<TrackLearningPeriodEntity[]>;

  @ApiProperty({
    description: 'Semesters in this track',
    type: () => [SemesterEntity],
  })
  @OneToMany(() => SemesterEntity, (semester) => semester.track)
  semesters: Relation<SemesterEntity[]>;
}
