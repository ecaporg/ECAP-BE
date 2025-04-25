import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@/core/services/base.service';

import { CourseEntity } from '../entities/course.entity';

@Injectable()
export class CourseService extends BaseService<CourseEntity> {
  constructor(
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
  ) {
    super(courseRepository);
  }
}
