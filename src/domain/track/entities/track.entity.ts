import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '../../../core';
import { SubjectEntity } from '../../subject/entities/subject.entity';
import { TenantEntity } from '../../tenant/entities/tenant.entity';

import { AcademicYearEntity } from './academic-year.entity';
import { SemesterEntity } from './semester.entity';
import { TrackCalendarEntity } from './track-calendar.entity';
import { TrackLearningPeriodEntity } from './track-learning-period.entity';

interface ITrackEntity {
  name: string;
  start_date: Date;
  end_date: Date;

  academicYear: AcademicYearEntity;
  academic_year_id: number;

  tenant: TenantEntity;
  tenant_id: number;

  learningPeriods: TrackLearningPeriodEntity[];
  semesters: SemesterEntity[];
  calendar: TrackCalendarEntity;

  subjects: SubjectEntity[];
}

@Entity({ name: 'tracks' })
export class TrackEntity extends GenericEntity implements ITrackEntity {
  @ApiProperty({ description: 'Tenant ID associated with this track' })
  @Column()
  tenant_id: number;

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
  tenant: TenantEntity;

  @ApiProperty({
    description: 'Academic year associated with this track',
    type: () => AcademicYearEntity,
  })
  @ManyToOne(() => AcademicYearEntity, (academicYear) => academicYear.tracks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'academic_year_id' })
  academicYear: AcademicYearEntity;

  @ApiProperty({
    description: 'Calendar entries for this track',
    type: () => TrackCalendarEntity,
  })
  @OneToOne(() => TrackCalendarEntity, (calendar) => calendar.track)
  calendar: TrackCalendarEntity;

  @ApiProperty({
    description: 'Subjects in this track',
    type: () => [{}],
  })
  @OneToMany(() => SubjectEntity, (subject) => subject.track)
  subjects: SubjectEntity[];

  @ApiProperty({
    description: 'Learning periods in this track',
    type: () => [{}],
  })
  @OneToMany(() => TrackLearningPeriodEntity, (period) => period.track)
  learningPeriods: TrackLearningPeriodEntity[];

  @ApiProperty({
    description: 'Semesters in this track',
    type: () => [SemesterEntity],
  })
  @OneToMany(() => SemesterEntity, (semester) => semester.track)
  semesters: SemesterEntity[];
}
