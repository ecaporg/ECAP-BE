import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '../../core/services/base.service';
import { DirectorEntity } from '../entities/director.entity';

@Injectable()
export class DirectorService extends BaseService<DirectorEntity, 'school_id'> {
  constructor(
    @InjectRepository(DirectorEntity)
    private readonly directorRepository: Repository<DirectorEntity>,
  ) {
    super(directorRepository, {
      primaryKeys: ['school_id'],
      defaultRelations: ['user', 'school'],
    });
  }

  async findByUserId(userId: number): Promise<DirectorEntity[]> {
    return this.findBy({
      where: { user_id: userId },
    });
  }

  async appointDirector(
    schoolId: number,
    userId: number,
  ): Promise<DirectorEntity> {
    return this.create({
      school_id: schoolId,
      user_id: userId,
    });
  }

  async isDirectorOf(userId: number, schoolId: number): Promise<boolean> {
    try {
      const director = await this.findOne(schoolId);
      return director.user_id === userId;
    } catch (error) {
      return false;
    }
  }

  async removeDirector(schoolId: number): Promise<void> {
    await this.delete(schoolId);
  }
}
