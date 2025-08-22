import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from 'src/core';

import { StudentEntity } from '../entities/student.entity';

@Injectable()
export class StudentService extends BaseService<StudentEntity> {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {
    super(studentRepository, { defaultRelations: { user: true } });
  }
}

