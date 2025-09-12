import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '../../../core';
import { AssignmentEntity } from '../entities/assignment.entity';

@Injectable()
export class CourseAssignmentService extends BaseService<AssignmentEntity> {
  constructor(
    @InjectRepository(AssignmentEntity)
    private assignmentRepository: Repository<AssignmentEntity>,
  ) {
    super(assignmentRepository);
  }
}
