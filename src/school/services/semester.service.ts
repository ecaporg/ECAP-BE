import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@/core/services/base.service';

import { SemesterEntity } from '../entities/semester.entity';

@Injectable()
export class SemesterService extends BaseService<SemesterEntity> {
  constructor(
    @InjectRepository(SemesterEntity)
    private semesterRepository: Repository<SemesterEntity>,
  ) {
    super(semesterRepository);
  }

  async findBySchoolId(schoolId: number): Promise<SemesterEntity[]> {
    return this.repository.find({
      where: { school_id: schoolId },
      relations: ['school'],
    });
  }
}
