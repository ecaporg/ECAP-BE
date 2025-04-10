import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { GenericEntity } from '../../core/generic-entity';
import { StudentEntity } from '../../students/entities/student.entity';

import { DirectorEntity } from './director.entity';
import { SemesterEntity } from './semester.entity';
import { AdminEntity, TeacherEntity } from './staff.entity';
import { TenantEntity } from './tenant.entity';
import { TrackEntity } from './track.entity';

@Entity({ name: 'schools' })
export class SchoolEntity extends GenericEntity {
  @Column({ length: 50 })
  name: string;

  @Column()
  tenant_id: number;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.schools)
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantEntity;

  @OneToMany(() => TrackEntity, (track) => track.school)
  tracks: TrackEntity[];

  @OneToMany(() => SemesterEntity, (semester) => semester.school)
  semesters: SemesterEntity[];

  @OneToMany(() => StudentEntity, (student) => student.school)
  students: StudentEntity[];

  @OneToMany(() => TeacherEntity, (teacher) => teacher.school)
  teachers: TeacherEntity[];

  @OneToOne(() => DirectorEntity, (director) => director.school)
  director: DirectorEntity;
}
