import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { GenericEntity } from '../../core/generic-entity';
import { StudentEntity } from '../../students/entities/student.entity';

import { DirectorEntity } from './director.entity';
import { SemesterEntity } from './semester.entity';
import { AdminEntity, TeacherEntity } from './staff.entity';
import { TrackEntity } from './track.entity';

@Entity({ name: 'schools' })
export class SchoolEntity extends GenericEntity {
  @Column({ length: 50 })
  name: string;

  @OneToMany(() => TrackEntity, (track) => track.school)
  tracks: TrackEntity[];

  @OneToMany(() => SemesterEntity, (semester) => semester.school)
  semesters: SemesterEntity[];

  @OneToMany(() => StudentEntity, (student) => student.school)
  students: StudentEntity[];

  @OneToMany(() => TeacherEntity, (teacher) => teacher.school)
  teachers: TeacherEntity[];

  @OneToMany(() => AdminEntity, (admin) => admin.school)
  admins: AdminEntity[];

  @OneToOne(() => DirectorEntity, (director) => director.school)
  director: DirectorEntity;
}
