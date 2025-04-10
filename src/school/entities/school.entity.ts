import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { GenericEntity } from '@/core/generic-entity';
import { DirectorEntity } from '@/staff/entities/director.entity';
import { TeacherEntity } from '@/staff/entities/staff.entity';
import { StudentEntity } from '@/students/entities/student.entity';

import { SemesterEntity } from './semester.entity';
import { TenantEntity } from './tenant.entity';

@Entity({ name: 'schools' })
export class SchoolEntity extends GenericEntity {
  @Column({ length: 50 })
  name: string;

  @Column()
  tenant_id: number;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.schools)
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantEntity;

  @OneToMany(() => SemesterEntity, (semester) => semester.school)
  semesters: SemesterEntity[];

  @OneToMany(() => StudentEntity, (student) => student.school)
  students: StudentEntity[];

  @OneToMany(() => TeacherEntity, (teacher) => teacher.school)
  teachers: TeacherEntity[];

  @OneToOne(() => DirectorEntity, (director) => director.school)
  director: DirectorEntity;
}
