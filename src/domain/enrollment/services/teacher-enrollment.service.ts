import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '../../../core';
import { TeacherEnrollmentEntity } from '../entities/teacher-enrollment.entity';

@Injectable()
export class TeacherEnrollmentService extends BaseService<TeacherEnrollmentEntity> {
  constructor(
    @InjectRepository(TeacherEnrollmentEntity)
    private courseRepository: Repository<TeacherEnrollmentEntity>,
  ) {
    super(courseRepository);
  }
}
