import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { GenericEntity } from '@/core/generic-entity';
import { DirectorEntity } from '@/staff/entities/director.entity';
import { TeacherEntity } from '@/staff/entities/staff.entity';
import { StudentEntity } from '@/students/entities/student.entity';

import { AssignmentEntity } from './subject-assignment.entity';
import { TenantEntity } from './tenant.entity';

@Entity({ name: 'schools' })
export class SchoolEntity extends GenericEntity {
  @Column({ length: 250 })
  name: string;

  @Column()
  tenant_id: number;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.schools)
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantEntity;

  @OneToMany(() => StudentEntity, (student) => student.school)
  students: StudentEntity[];

  @OneToMany(() => TeacherEntity, (teacher) => teacher.school)
  teachers: TeacherEntity[];

  @OneToMany(() => DirectorEntity, (director) => director.school)
  directors: DirectorEntity[];

  @OneToMany(() => AssignmentEntity, (assignment) => assignment.school)
  assignments: AssignmentEntity[];
}
