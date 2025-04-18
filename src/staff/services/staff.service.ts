import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService, BaseServiceOptions } from '@/core/services/base.service';
import { AdminEntity, TeacherEntity } from '@/staff/entities/staff.entity';

@Injectable()
export class StaffService {
  private readonly teacherService: BaseService<TeacherEntity>;
  private readonly adminService: BaseService<AdminEntity>;

  constructor(
    @InjectRepository(TeacherEntity)
    private teacherRepository: Repository<TeacherEntity>,

    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
  ) {
    const options: BaseServiceOptions<TeacherEntity, 'id'> = {
      defaultRelations: ['user'],
    };

    this.teacherService = new BaseService<TeacherEntity, 'id'>(
      teacherRepository,
      options,
    );

    const adminOptions: BaseServiceOptions<AdminEntity, 'id'> = {
      defaultRelations: ['user', 'tenant'],
    };

    this.adminService = new BaseService<AdminEntity, 'id'>(
      adminRepository,
      adminOptions,
    );
  }

  async createTeacher(userId: number): Promise<TeacherEntity> {
    return this.teacherService.create({
      id: userId,
    });
  }

  // Методи для адміністраторів
  async findAdminsByTenantId(tenantId: number): Promise<AdminEntity[]> {
    return this.adminService.findBy({
      where: { tenant_id: tenantId },
    });
  }

  async createAdmin(userId: number, tenantId: number): Promise<AdminEntity> {
    return this.adminService.create({
      id: userId,
      tenant_id: tenantId,
    });
  }
}
