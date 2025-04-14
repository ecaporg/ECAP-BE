import { Column, Entity, OneToMany } from 'typeorm';

import { GenericEntity } from '@/core/generic-entity';

import { SemesterEntity } from './semester.entity';

@Entity({ name: 'academic_years' })
export class AcademicYearEntity extends GenericEntity {
  @Column({ type: 'int' })
  from: number;

  @Column({ type: 'int' })
  to: number;

  @OneToMany(() => SemesterEntity, (semester) => semester.academic_year)
  semesters: SemesterEntity[];
}
