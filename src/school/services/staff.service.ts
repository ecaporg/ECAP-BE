import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AdminEntity, TeacherEntity } from '../entities/staff.entity';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(TeacherEntity)
    private teacherRepository: Repository<TeacherEntity>,

    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
  ) {}

  async findTeachersBySchoolId(schoolId: number): Promise<TeacherEntity[]> {
    return this.teacherRepository.find({
      where: { school_id: schoolId },
      relations: ['school', 'user'],
    });
  }

  async findAdminsBySchoolId(schoolId: number): Promise<AdminEntity[]> {
    return this.adminRepository.find({
      where: { school_id: schoolId },
      relations: ['school', 'user'],
    });
  }

  async findTeachersByUserId(userId: number): Promise<TeacherEntity[]> {
    return this.teacherRepository.find({
      where: { user_id: userId },
      relations: ['school', 'user'],
    });
  }

  async findAdminsByUserId(userId: number): Promise<AdminEntity[]> {
    return this.adminRepository.find({
      where: { user_id: userId },
      relations: ['school', 'user'],
    });
  }
}
