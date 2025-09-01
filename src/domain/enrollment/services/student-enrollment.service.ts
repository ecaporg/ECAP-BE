import { In, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '../../../core';
import { StudentLPEnrollmentEntity } from '../entities/student-enrollment.entity';

@Injectable()
export class StudentLPEnrollmentService extends BaseService<StudentLPEnrollmentEntity> {
  constructor(
    @InjectRepository(StudentLPEnrollmentEntity)
    private readonly studentLPEnrollmentRepository: Repository<StudentLPEnrollmentEntity>,
  ) {
    super(studentLPEnrollmentRepository);
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

    const completedCount = await this.studentLPEnrollmentRepository.count({
      where,
    });

    assignmentPeriods.meta.additionalData = {
      completedCount,
    };

    console.log(assignmentPeriods);
    return assignmentPeriods;
  }

  getRepository(): Repository<StudentLPEnrollmentEntity> {
    return this.studentLPEnrollmentRepository;
  }
}
