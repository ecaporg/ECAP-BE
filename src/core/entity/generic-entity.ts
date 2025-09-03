import {
  Column,
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

export abstract class CanvasGenericEntity extends GenericEntity {
  @Column({ nullable: true, length: 50 })
  canvas_id?: string;
}
