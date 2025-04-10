import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '../../core/services/base.service';
import { SchoolEntity } from '../entities/school.entity';

@Injectable()
export class SchoolService extends BaseService<SchoolEntity> {
  constructor(
    @InjectRepository(SchoolEntity)
    private schoolRepository: Repository<SchoolEntity>,
  ) {
    super(schoolRepository, {
      defaultRelations: ['tenant', 'academy', 'director'],
    });
  }
}
