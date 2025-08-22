import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from 'src/core';

import { ErrorEntity } from '../entities/error.entity';

@Injectable()
export class ErrorService extends BaseService<ErrorEntity> {
  constructor(
    @InjectRepository(ErrorEntity)
    private errorRepository: Repository<ErrorEntity>,
  ) {
    super(errorRepository);
  }
}

