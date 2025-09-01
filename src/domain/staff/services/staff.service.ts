import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '../../../core';
import {
  AdminEntity,
  DirectorEntity,
  TeacherEntity,
} from '../../staff/entities/staff.entity';

@Injectable()
export class TeacherService extends BaseService<TeacherEntity> {
  constructor(
    @InjectRepository(TeacherEntity)
    private teacherRepository: Repository<TeacherEntity>,
  ) {
    super(teacherRepository, {
      defaultRelations: ['user'],
    });
  }
}

@Injectable()
export class AdminService extends BaseService<AdminEntity> {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
  ) {
    super(adminRepository, {
      defaultRelations: ['user', 'tenant'],
    });
  }
}

@Injectable()
export class DirectorService extends BaseService<DirectorEntity> {
  constructor(
    @InjectRepository(DirectorEntity)
    private directorRepository: Repository<DirectorEntity>,
  ) {
    super(directorRepository, {
      defaultRelations: ['user', 'academy'],
    });
  }
}
