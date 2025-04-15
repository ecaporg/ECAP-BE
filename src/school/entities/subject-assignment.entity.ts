import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { GenericEntity } from '@/core/generic-entity';
import { TeacherEntity } from '@/staff/entities/staff.entity';
import { SampleEntity } from '@/students/entities/sample.entity';
import { StudentEntity } from '@/students/entities/student.entity';
import { SubjectEntity } from '@/track/entities/subject.entity';
import { TrackLearningPeriodEntity } from '@/track/entities/track-learning-period.entity';

import { AcademicYearEntity } from './academic-year.entity';
import { SchoolEntity } from './school.entity';
@Entity('assignments')
export class AssignmentEntity extends GenericEntity {
  @Column()
  school_id: number;

  @Column()
  teacher_id: number;

  @Column()
  subject_id: number;

  @Column()
  academic_year_id: number;

  @ManyToOne(() => SchoolEntity)
  @JoinColumn({ name: 'school_id' })
  school: SchoolEntity;

  @ManyToOne(() => TeacherEntity)
  @JoinColumn([
    { name: 'teacher_id', referencedColumnName: 'user_id' },
    { name: 'school_id', referencedColumnName: 'school_id' },
  ])
  teacher: TeacherEntity;

  @ManyToOne(() => SubjectEntity)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  @ManyToOne(() => AcademicYearEntity)
  @JoinColumn({ name: 'academic_year_id' })
  academic_year: AcademicYearEntity;

  @OneToMany(
    () => AssignmentPeriodEntity,
    (assignment_period) => assignment_period.assignment,
  )
  assignment_periods: AssignmentPeriodEntity[];
}

@Entity('assignment_periods')
export class AssignmentPeriodEntity extends GenericEntity {
  @Column()
  subject_assignment_id: number;

  @Column()
  student_id: number;

  @Column()
  learning_period_id: number;

  @Column()
  completed: boolean;

  @ManyToOne(() => TrackLearningPeriodEntity)
  @JoinColumn({ name: 'learning_period_id' })
  learning_period: TrackLearningPeriodEntity;

  @ManyToOne(() => AssignmentEntity)
  @JoinColumn({ name: 'subject_assignment_id' })
  assignment: AssignmentEntity;

  @ManyToOne(() => StudentEntity)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @OneToMany(() => SampleEntity, (sample) => sample.assignment_period)
  samples: SampleEntity[];
}
