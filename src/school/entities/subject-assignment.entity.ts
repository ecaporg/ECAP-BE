import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { GenericEntity } from '@/core/generic-entity';
import { TeacherEntity } from '@/staff/entities/staff.entity';
import { StudentEntity } from '@/students/entities/student.entity';
import { SubjectEntity } from '@/track/entities/subject.entity';

import { AcademicYearEntity } from './academic-year.entity';

@Entity({ name: 'subject_assignments' })
export class SubjectAssignmentEntity extends GenericEntity {
  @Column()
  student_id: number;

  @Column()
  teacher_id: number;

  @Column()
  subject_id: number;

  @Column()
  academic_year_id: number;

  @ManyToOne(() => StudentEntity)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @ManyToOne(() => TeacherEntity)
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;

  @ManyToOne(() => SubjectEntity)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  @ManyToOne(() => AcademicYearEntity)
  @JoinColumn({ name: 'academic_year_id' })
  academic_year: AcademicYearEntity;
}
