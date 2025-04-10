import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { GenericEntity } from '@/core/generic-entity';
import { TeacherEntity } from '@/staff/entities/staff.entity';
import { SubjectEntity } from '@/track/entities/subject.entity';
import { TrackLearningPeriodEntity } from '@/track/entities/track-learning-period.entity';

import { StudentEntity } from './student.entity';

@Entity({ name: 'samples' })
export class SampleEntity extends GenericEntity {
  @Column()
  student_id: number;

  @Column()
  subject_id: number;

  @Column()
  teacher_id: number;

  @Column({ length: 50 })
  assignment_title: string;

  @Column({ length: 50 })
  status: string;

  @Column()
  learning_period_id: number;

  @ManyToOne(() => StudentEntity, (student) => student.samples)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @ManyToOne(() => SubjectEntity, (subject) => subject.samples)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.samples)
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;

  @ManyToOne(() => TrackLearningPeriodEntity, (period) => period.samples)
  @JoinColumn({ name: 'learning_period_id' })
  learningPeriod: TrackLearningPeriodEntity;
}
