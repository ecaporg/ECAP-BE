import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { GenericEntity } from '@/core/generic-entity';
import { AssignmentPeriodEntity } from '@/school/entities/subject-assignment.entity';
import { TeacherEntity } from '@/staff/entities/staff.entity';
import { SubjectEntity } from '@/track/entities/subject.entity';

@Entity({ name: 'samples' })
export class SampleEntity extends GenericEntity {
  @Column({ length: 250 })
  assignment_title: string;

  @Column({ length: 250 })
  status: string;

  @Column({ nullable: true })
  user_id: number;

  @Column({ nullable: true })
  school_id: number;

  @Column()
  assignment_period_id: number;

  @Column()
  subject_id: number;

  @ManyToOne(() => SubjectEntity, (subject) => subject.samples)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  @ManyToOne(
    () => AssignmentPeriodEntity,
    (assignment_period) => assignment_period.samples,
  )
  @JoinColumn({ name: 'assignment_period_id' })
  assignment_period: AssignmentPeriodEntity;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.samples)
  @JoinColumn([
    { name: 'user_id', referencedColumnName: 'user_id' },
    { name: 'school_id', referencedColumnName: 'school_id' },
  ])
  done_by_teacher: TeacherEntity;
}
