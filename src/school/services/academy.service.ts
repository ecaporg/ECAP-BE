import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@/core/services/base.service';

import { AcademyEntity } from '../entities/academy.entity';

@Injectable()
export class AcademyService extends BaseService<AcademyEntity> {
  constructor(
    @InjectRepository(AcademyEntity)
    private readonly academyRepository: Repository<AcademyEntity>,
  ) {
    super(academyRepository);
  }
}
