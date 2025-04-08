import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { GenericEntity } from '../../core/generic-entity';
import { TeacherEntity } from '../../school/entities/staff.entity';
import { SubjectEntity } from '../../school/entities/subject.entity';

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

  @ManyToOne(() => StudentEntity, (student) => student.samples)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @ManyToOne(() => SubjectEntity, (subject) => subject.samples)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.samples)
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;
}
