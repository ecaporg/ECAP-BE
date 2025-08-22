import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from 'src/core';

import { TeacherSchoolYearEnrollmentEntity } from '../entities/teacher-enrollment.entity';

@Injectable()
export class TeacherSchoolYearEnrollmentService extends BaseService<TeacherSchoolYearEnrollmentEntity> {
  constructor(
    @InjectRepository(TeacherSchoolYearEnrollmentEntity)
    private courseRepository: Repository<TeacherSchoolYearEnrollmentEntity>,
  ) {
    super(courseRepository);
  }
}
