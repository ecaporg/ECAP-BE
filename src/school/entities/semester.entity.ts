import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { GenericEntity } from '@/core/generic-entity';

import { AcademicYearEntity } from './academic-year.entity';
import { TenantEntity } from './tenant.entity';

@Entity({ name: 'semesters' })
export class SemesterEntity extends GenericEntity {
  @Column()
  tenant_id: number;

  @Column()
  academic_year_id: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.semesters)
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantEntity;

  @ManyToOne(() => AcademicYearEntity, (academicYear) => academicYear.semesters)
  @JoinColumn({ name: 'academic_year_id' })
  academic_year: AcademicYearEntity;
}
