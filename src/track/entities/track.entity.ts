import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '@/core/generic-entity';
import { TenantEntity } from '@/school/entities/tenant.entity';
import { StudentEntity } from '@/students/entities/student.entity';

import { SubjectEntity } from './subject.entity';
import { TrackCalendarEntity } from './track-calendar.entity';
import { TrackLearningPeriodEntity } from './track-learning-period.entity';

@Entity({ name: 'tracks' })
export class TrackEntity extends GenericEntity {
  @ApiProperty({ description: 'Tenant ID associated with this track' })
  @Column()
  tenant_id: number;

  @ApiProperty({ description: 'Track name', maxLength: 250 })
  @Column({ length: 250 })
  name: string;

  @ApiProperty({ description: 'Track start date' })
  @Column()
  start_date: Date;

  @ApiProperty({ description: 'Track end date' })
  @Column()
  end_date: Date;

  @ApiProperty({
    description: 'Tenant associated with this track',
    type: () => TenantEntity,
  })
  @ManyToOne(() => TenantEntity, (tenant) => tenant.tracks)
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantEntity;

  @ApiProperty({
    description: 'Calendar entries for this track',
    type: () => [{}],
  })
  @OneToMany(() => TrackCalendarEntity, (calendar) => calendar.track)
  calendar: TrackCalendarEntity[];

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
    description: 'Students enrolled in this track',
    type: () => [{}],
  })
  @OneToMany(() => StudentEntity, (student) => student.track)
  students: StudentEntity[];
}
