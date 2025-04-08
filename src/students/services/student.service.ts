import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '../../core/services/base.service';
import { StudentEntity } from '../entities/student.entity';

@Injectable()
export class StudentService extends BaseService<StudentEntity> {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {
    super(studentRepository);
  }

  async findBySchoolId(schoolId: number): Promise<StudentEntity[]> {
    return this.repository.find({
      where: { school_id: schoolId },
      relations: ['school', 'user'],
    });
  }

  async findByUserId(userId: number): Promise<StudentEntity[]> {
    return this.repository.find({
      where: { user_id: userId },
      relations: ['school', 'user'],
    });
  }
}
