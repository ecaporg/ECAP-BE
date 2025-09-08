import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService, SortDirectionEnum } from '../../../core';
import {} from '../entities/student-enrollment.entity';
import { StudentLPEnrollmentAssignmentEntity } from '../entities/student-enrollment-assignment.entity';

@Injectable()
export class StudentLPEnrollmentAssignmentService extends BaseService<
  // StudentLPEnrollmentAssignmentEntity,
  any,
  'assignment_id' | 'student_lp_enrollment_id'
> {
  constructor(
    @InjectRepository(StudentLPEnrollmentAssignmentEntity)
    private readonly studentLPEnrollmentAssignmentRepository: Repository<StudentLPEnrollmentAssignmentEntity>,
  ) {
    super(studentLPEnrollmentAssignmentRepository, {
      primaryKeys: ['assignment_id', 'student_lp_enrollment_id'],
      defaultSortByOptions: { assignment_id: SortDirectionEnum.ASC },
    });
  }

  getRepository(): Repository<StudentLPEnrollmentAssignmentEntity> {
    return this.studentLPEnrollmentAssignmentRepository;
  }
}
