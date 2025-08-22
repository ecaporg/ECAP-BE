import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '../../core';

import { SemesterEntity } from '../../track/entities/semester.entity';

@Injectable()
export class SemesterService extends BaseService<SemesterEntity> {
  constructor(
    @InjectRepository(SemesterEntity)
    private semesterRepository: Repository<SemesterEntity>,
  ) {
    super(semesterRepository);
  }
}
