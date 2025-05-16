import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '@/core';
import { CourseEntity } from '@/course/entities/course.entity';
import { StudentEntity } from '@/students/entities/student.entity';
import { TenantEntity } from '@/tenant/entities/tenant.entity';

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
  @ManyToOne(() => TenantEntity, (tenant) => tenant.schools, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantEntity;

  @ApiProperty({
    description: 'Students enrolled in this school',
    type: () => [{}],
  })
  @OneToMany(() => StudentEntity, (student) => student.school)
  students: StudentEntity[];

  @ApiProperty({
    description: 'Subject assignments in this school',
    type: () => [{}],
  })
  @OneToMany(() => CourseEntity, (course) => course.school)
  courses: CourseEntity[];
}
