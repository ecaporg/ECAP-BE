import { In, Repository } from 'typeorm';

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
      completed: In([true]),
      ...options.filters,
    } as any;

    console.log(where, where.completed);

    if (
      where.completed.value.length === 1 &&
      where.completed.value[0] === false
    ) {
      (assignmentPeriods.meta as any).completedCount = 0;
      return assignmentPeriods;
    }

    const completedCount = await this.assignmentPeriodRepository.count({
      where,
    });

    (assignmentPeriods.meta as any).completedCount = completedCount;

    console.log(assignmentPeriods);
    return assignmentPeriods;
  }

  getRepository(): Repository<AssignmentPeriodEntity> {
    return this.assignmentPeriodRepository;
  }
}
