import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '@/core/generic-entity';
import { DirectorEntity } from '@/staff/entities/director.entity';
import { TeacherEntity } from '@/staff/entities/staff.entity';
import { StudentEntity } from '@/students/entities/student.entity';

import { AssignmentEntity } from './subject-assignment.entity';
import { TenantEntity } from './tenant.entity';

@Entity({ name: 'schools' })
export class SchoolEntity extends GenericEntity {
  @ApiProperty({ description: 'School name', maxLength: 250 })
  @Column({ length: 250 })
  name: string;

  @ApiProperty({ description: 'Tenant ID associated with this school' })
  @Column()
  tenant_id: number;

  @ApiProperty({
    description: 'Tenant associated with this school',
    type: () => Object,
  })
  @ManyToOne(() => TenantEntity, (tenant) => tenant.schools)
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantEntity;

  @ApiProperty({
    description: 'Students enrolled in this school',
    type: () => [{}],
  })
  @OneToMany(() => StudentEntity, (student) => student.school)
  students: StudentEntity[];

  @ApiProperty({
    description: 'Teachers working in this school',
    type: () => [{}],
  })
  @OneToMany(() => TeacherEntity, (teacher) => teacher.school)
  teachers: TeacherEntity[];

  @ApiProperty({
    description: 'Directors of this school',
    type: () => [{}],
  })
  @OneToMany(() => DirectorEntity, (director) => director.school)
  directors: DirectorEntity[];

  @ApiProperty({
    description: 'Subject assignments in this school',
    type: () => [{}],
  })
  @OneToMany(() => AssignmentEntity, (assignment) => assignment.school)
  assignments: AssignmentEntity[];
}
