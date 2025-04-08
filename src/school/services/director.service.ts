import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '../../core/services/base.service';
import { DirectorEntity } from '../entities/director.entity';

@Injectable()
export class DirectorService extends BaseService<
  DirectorEntity,
  'user_id' | 'school_id'
> {
  constructor(
    @InjectRepository(DirectorEntity)
    private readonly directorRepository: Repository<DirectorEntity>,
  ) {
    // Використовуємо складений первинний ключ та стандартні відношення
    super(directorRepository, {
      primaryKeys: ['user_id', 'school_id'],
      defaultRelations: ['user', 'school'],
    });
  }

  async findByUserId(userId: number): Promise<DirectorEntity[]> {
    return this.findBy({
      where: { user_id: userId },
    });
  }

  async appointDirector(
    userId: number,
    schoolId: number,
  ): Promise<DirectorEntity> {
    return this.create({
      user_id: userId,
      school_id: schoolId,
    });
  }

  async isDirectorOf(userId: number, schoolId: number): Promise<boolean> {
    return this.exists({
      user_id: userId,
      school_id: schoolId,
    });
  }

  async removeDirector(userId: number, schoolId: number): Promise<void> {
    await this.delete({
      user_id: userId,
      school_id: schoolId,
    });
  }
}
