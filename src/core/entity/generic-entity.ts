import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class DatedGenericEntity {
  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
export abstract class GenericEntity extends DatedGenericEntity {
  @PrimaryGeneratedColumn()
  id: number;
}

