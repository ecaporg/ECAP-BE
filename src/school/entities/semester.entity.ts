import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '@/core/generic-entity';

import { AcademicYearEntity } from './academic-year.entity';
import { TenantEntity } from './tenant.entity';

@Entity({ name: 'semesters' })
export class SemesterEntity extends GenericEntity {
  @ApiProperty({ description: 'Tenant ID associated with this semester' })
  @Column()
  tenant_id: number;

  @ApiProperty({
    description: 'Academic year ID associated with this semester',
  })
  @Column()
  academic_year_id: number;

  @ApiProperty({ description: 'Semester name', maxLength: 250 })
  @Column({ length: 250 })
  name: string;

  @ApiProperty({ description: 'Semester start date' })
  @Column()
  start_date: Date;

  @ApiProperty({ description: 'Semester end date' })
  @Column()
  end_date: Date;

  @ApiProperty({
    description: 'Tenant associated with this semester',
    type: () => TenantEntity,
  })
  @ManyToOne(() => TenantEntity, (tenant) => tenant.semesters)
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantEntity;

  @ApiProperty({
    description: 'Academic year associated with this semester',
    type: () => AcademicYearEntity,
  })
  @ManyToOne(() => AcademicYearEntity, (academicYear) => academicYear.semesters)
  @JoinColumn({ name: 'academic_year_id' })
  academic_year: AcademicYearEntity;
}
