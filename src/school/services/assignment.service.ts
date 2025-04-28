import { FindOperator, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@/core';

import { AssignmentPeriodEntity } from '../entities/assignment.entity';

@Injectable()
export class AssignmentPeriodService extends BaseService<AssignmentPeriodEntity> {
  constructor(
    @InjectRepository(AssignmentPeriodEntity)
    private readonly assignmentPeriodRepository: Repository<AssignmentPeriodEntity>,
  ) {
    super(assignmentPeriodRepository);
  }

  async findAllWithCompletedCount(
    options: Parameters<typeof this.findAll>[0],
    relations: Parameters<typeof this.findAll>[1],
  ) {
    const assignmentPeriods = await this.findAll(options, relations);
    const where = {
      completed: true,
      ...options.filters,
    };
    console.log(where);

    if ((where.completed as FindOperator<boolean>)?.value === false) {
      (assignmentPeriods.meta as any).completedCount = 0;
      return assignmentPeriods;
    }

    const completedCount = await this.assignmentPeriodRepository.count({
      where,
    });

    (assignmentPeriods.meta as any).completedCount = completedCount;

    return assignmentPeriods;
  }
}
