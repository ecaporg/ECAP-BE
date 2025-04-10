import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { GenericEntity } from '@/core/generic-entity';
import { TenantEntity } from '@/school/entities/tenant.entity';

import { SubjectEntity } from './subject.entity';
import { TrackCalendarEntity } from './track-calendar.entity';
import { TrackLearningPeriodEntity } from './track-learning-period.entity';

@Entity({ name: 'tracks' })
export class TrackEntity extends GenericEntity {
  @Column()
  tenant_id: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.tracks)
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantEntity;

  @OneToMany(() => TrackCalendarEntity, (calendar) => calendar.track)
  calendar: TrackCalendarEntity[];

  @OneToMany(() => SubjectEntity, (subject) => subject.track)
  subjects: SubjectEntity[];

  @OneToMany(() => TrackLearningPeriodEntity, (period) => period.track)
  learningPeriods: TrackLearningPeriodEntity[];
}
