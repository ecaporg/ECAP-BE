import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '../../core/services/base.service';
import { SubjectEntity } from '../entities/subject.entity';

@Injectable()
export class SubjectService extends BaseService<SubjectEntity> {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
  ) {
    super(subjectRepository);
  }

  async findByTrackId(trackId: number): Promise<SubjectEntity[]> {
    return this.repository.find({
      where: { track_id: trackId },
      relations: ['track'],
    });
  }
}
