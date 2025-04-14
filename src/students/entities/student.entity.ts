import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { GenericEntity } from '@/core/generic-entity';
import { AcademyEntity } from '@/school/entities/academy.entity';
import { SchoolEntity } from '@/school/entities/school.entity';
import { AssignmentPeriodEntity } from '@/school/entities/subject-assignment.entity';
import { TrackEntity } from '@/track/entities/track.entity';
import { UserEntity } from '@/users/entities/user.entity';

@Entity({ name: 'students' })
export class StudentEntity extends GenericEntity {
  @Column()
  school_id: number;

  @Column()
  user_id: number;

  @Column({ nullable: true })
  academy_id: number;

  @Column({ nullable: true })
  track_id: number;

  @Column({ length: 50 })
  grade: string;

  @ManyToOne(() => SchoolEntity, (school) => school.students)
  @JoinColumn({ name: 'school_id' })
  school: SchoolEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => AcademyEntity)
  @JoinColumn({ name: 'academy_id' })
  academy: AcademyEntity;

  @ManyToOne(() => TrackEntity, (track) => track.students)
  @JoinColumn({ name: 'track_id' })
  track: TrackEntity;

  @OneToMany(
    () => AssignmentPeriodEntity,
    (assignment_period) => assignment_period.student,
  )
  assignment_periods: AssignmentPeriodEntity[];
}
