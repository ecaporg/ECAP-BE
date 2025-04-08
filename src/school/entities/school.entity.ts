import { Column, Entity, OneToMany } from 'typeorm';

import { GenericEntity } from '../../core/generic-entity';
import { StudentEntity } from '../../students/entities/student.entity';

import { SemesterEntity } from './semester.entity';
import { StaffEntity } from './staff.entity';
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

  @OneToMany(() => StaffEntity, (staff) => staff.school)
  staff: StaffEntity[];
}
