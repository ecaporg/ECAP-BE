import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@/core/services/base.service';

import { DirectorEntity } from '../entities/director.entity';

@Injectable()
export class DirectorService extends BaseService<DirectorEntity> {
  constructor(
    @InjectRepository(DirectorEntity)
    private readonly directorRepository: Repository<DirectorEntity>,
  ) {
    super(directorRepository, {
      defaultRelations: ['user', 'school', 'academy'],
    });
  }

  async findByAcademyId(academyId: number): Promise<DirectorEntity[]> {
    return this.findBy({
      where: { academy_id: academyId },
    });
  }

  async appointDirector(
    schoolId: number,
    userId: number,
    academyId: number,
  ): Promise<DirectorEntity> {
    return this.create({
      school_id: schoolId,
      id: userId,
      academy_id: academyId,
    });
  }

  async removeDirector(schoolId: number): Promise<void> {
    await this.delete(schoolId);
  }
}
