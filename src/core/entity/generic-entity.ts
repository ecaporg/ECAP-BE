import {
  ICanvasGeneric,
  IDatedGeneric,
  IGeneric,
  IIDCanvasGeneric,
  IIDGeneric,
  ITenantGeneric,
} from 'ecap-lib/dist/types';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export { EntityId, EntityKey } from 'ecap-lib/dist/types';

export abstract class IDGenericEntity implements IIDGeneric {
  @PrimaryGeneratedColumn()
  id: number;
}

export abstract class DatedGenericEntity implements IDatedGeneric {
  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

export abstract class GenericEntity
  extends DatedGenericEntity
  implements IGeneric
{
  @PrimaryGeneratedColumn()
  id: number;
}

export abstract class CanvasGenericEntity
  extends GenericEntity
  implements ICanvasGeneric
{
  @Column({ nullable: true, length: 20 })
  canvas_id?: string;
}

export abstract class IDCanvasGenericEntity
  extends IDGenericEntity
  implements IIDCanvasGeneric
{
  @Column({ nullable: true, length: 20 })
  canvas_id?: string;
}

export abstract class TenantGenericEntity
  extends IDGenericEntity
  implements ITenantGeneric
{
  @Column()
  tenant_id: number;
}
