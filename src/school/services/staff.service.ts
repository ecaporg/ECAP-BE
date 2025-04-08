import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  BaseService,
  BaseServiceOptions,
} from '../../core/services/base.service';
import { AdminEntity, TeacherEntity } from '../entities/staff.entity';

@Injectable()
export class StaffService {
  private readonly teacherService: BaseService<
    TeacherEntity,
    'user_id' | 'school_id'
  >;
  private readonly adminService: BaseService<
    AdminEntity,
    'user_id' | 'school_id'
  >;

  constructor(
    @InjectRepository(TeacherEntity)
    private teacherRepository: Repository<TeacherEntity>,

    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
  ) {
    const options: BaseServiceOptions<'user_id' | 'school_id'> = {
      primaryKeys: ['user_id', 'school_id'],
      defaultRelations: ['user', 'school'],
    };

    this.teacherService = new BaseService<
      TeacherEntity,
      'user_id' | 'school_id'
    >(teacherRepository, options);

    this.adminService = new BaseService<AdminEntity, 'user_id' | 'school_id'>(
      adminRepository,
      options,
    );
  }

  // Методи для вчителів
  async findTeachersBySchoolId(schoolId: number): Promise<TeacherEntity[]> {
    return this.teacherService.findBy({
      where: { school_id: schoolId },
    });
  }

  async findTeachersByUserId(userId: number): Promise<TeacherEntity[]> {
    return this.teacherService.findBy({
      where: { user_id: userId },
    });
  }

  async createTeacher(
    userId: number,
    schoolId: number,
  ): Promise<TeacherEntity> {
    return this.teacherService.create({
      user_id: userId,
      school_id: schoolId,
    });
  }

  // Методи для адміністраторів
  async findAdminsBySchoolId(schoolId: number): Promise<AdminEntity[]> {
    return this.adminService.findBy({
      where: { school_id: schoolId },
    });
  }

  async findAdminsByUserId(userId: number): Promise<AdminEntity[]> {
    return this.adminService.findBy({
      where: { user_id: userId },
    });
  }

  async createAdmin(userId: number, schoolId: number): Promise<AdminEntity> {
    return this.adminService.create({
      user_id: userId,
      school_id: schoolId,
    });
  }
}
