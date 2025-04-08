import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '../../core/services/base.service';
import { SampleEntity } from '../entities/sample.entity';

@Injectable()
export class SampleService extends BaseService<SampleEntity> {
  constructor(
    @InjectRepository(SampleEntity)
    private sampleRepository: Repository<SampleEntity>,
  ) {
    super(sampleRepository);
  }

  async findByStudentId(studentId: number): Promise<SampleEntity[]> {
    return this.repository.find({
      where: { student_id: studentId },
      relations: ['student', 'subject', 'teacher'],
    });
  }

  async findBySubjectId(subjectId: number): Promise<SampleEntity[]> {
    return this.repository.find({
      where: { subject_id: subjectId },
      relations: ['student', 'subject', 'teacher'],
    });
  }

  async findByTeacherId(teacherId: number): Promise<SampleEntity[]> {
    return this.repository.find({
      where: { teacher_id: teacherId },
      relations: ['student', 'subject', 'teacher'],
    });
  }
}
