import { Equal, In, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@/core';

import {
  AssignmentEntity,
  AssignmentPeriodEntity,
} from '../entities/subject-assignment.entity';

@Injectable()
export class AssignmentService extends BaseService<AssignmentEntity> {
  constructor(
    @InjectRepository(AssignmentEntity)
    private readonly assignmentRepository: Repository<AssignmentEntity>,
  ) {
    super(assignmentRepository);
  }

  async getTest() {
    const assignments = await this.assignmentRepository.find({
      where: {
        id: Equal(1),
        assignment_periods: {
          learning_period: {
            id: Equal(1),
          },
        },
      },
    });

    return assignments;
  }
}

@Injectable()
export class AssignmentPeriodService extends BaseService<AssignmentPeriodEntity> {
  constructor(
    @InjectRepository(AssignmentPeriodEntity)
    private readonly assignmentPeriodRepository: Repository<AssignmentPeriodEntity>,
  ) {
    super(assignmentPeriodRepository);
  }
}
