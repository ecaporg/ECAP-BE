import { Repository } from 'typeorm';

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

    const completedCount = await this.assignmentPeriodRepository.count({
      where: { completed: true, ...options.filters },
    });

    return {
      ...assignmentPeriods,
      meta: {
        ...assignmentPeriods.meta,
        completedCount,
      },
    };
  }
}
