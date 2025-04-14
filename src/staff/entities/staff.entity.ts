import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { DatedGenericEntity } from '@/core/generic-entity';
import { SchoolEntity } from '@/school/entities/school.entity';
import { AssignmentEntity } from '@/school/entities/subject-assignment.entity';
import { TenantEntity } from '@/school/entities/tenant.entity';
import { SampleEntity } from '@/students/entities/sample.entity';
import { UserEntity } from '@/users/entities/user.entity';
export abstract class StaffEntity extends DatedGenericEntity {
  @PrimaryColumn()
  user_id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}

@Entity({ name: 'teachers' })
export class TeacherEntity extends StaffEntity {
  @PrimaryColumn()
  school_id: number;

  @ManyToOne(() => SchoolEntity)
  @JoinColumn({ name: 'school_id' })
  school: SchoolEntity;

  @OneToMany(() => SampleEntity, (sample) => sample.done_by_teacher)
  samples: SampleEntity[];

  @OneToMany(() => AssignmentEntity, (assignment) => assignment.teacher)
  assignments: AssignmentEntity[];
}

@Entity({ name: 'admins' })
export class AdminEntity extends StaffEntity {
  @PrimaryColumn()
  tenant_id: number;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.admins)
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantEntity;
}
