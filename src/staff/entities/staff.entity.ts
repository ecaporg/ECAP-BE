import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { DatedGenericEntity } from '@/core/generic-entity';
import { SchoolEntity } from '@/school/entities/school.entity';
import { TenantEntity } from '@/school/entities/tenant.entity';
import { SampleEntity } from '@/students/entities/sample.entity';
import { UserEntity } from '@/users/entities/user.entity';

export abstract class StaffEntity extends DatedGenericEntity {
  @PrimaryColumn()
  user_id: number;

  @Index()
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}

@Entity({ name: 'teachers' })
export class TeacherEntity extends StaffEntity {
  @PrimaryColumn()
  school_id: number;

  @Index()
  @ManyToOne(() => SchoolEntity)
  @JoinColumn({ name: 'school_id' })
  school: SchoolEntity;

  @OneToMany(() => SampleEntity, (sample) => sample.teacher)
  samples: SampleEntity[];
}

@Entity({ name: 'admins' })
export class AdminEntity extends StaffEntity {
  @PrimaryColumn()
  tenant_id: number;

  @Index()
  @ManyToOne(() => TenantEntity, (tenant) => tenant.admins)
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantEntity;
}
