import { Injectable } from '@nestjs/common';

import { IAuthUser } from '@/auth/types/auth-user';
import { BaseService, extractPaginationOptions } from '@/core';
import { CourseService } from '@/course/services/course.service';
import { TeacherEntity } from '@/staff/entities/staff.entity';
import { RolesEnum } from '@/users/enums/roles.enum';

import { TeachersTableFilterDto } from '../dto/filters.dto';

import { TeacherComplianceTaskService } from './teacher.service';

@Injectable()
export class AdminComplianceService {
  constructor(
    private readonly courseService: CourseService,
    private readonly teacherComplianceTaskService: TeacherComplianceTaskService,
    private readonly teacherService: BaseService<TeacherEntity>,
  ) {}

  async getTeachers(filters: TeachersTableFilterDto) {
    const paginationOptions = extractPaginationOptions(filters);
    const courses = await this.courseService.findAll(paginationOptions, {
      teacher: {
        user: true,
      },
      academic_year: true,
      school: true,
      assignment_periods: {
        samples: true,
        student: {
          academy: true,
        },
      },
    });

    return courses;
  }

  async getFilters(user: IAuthUser) {
    return this.teacherComplianceTaskService.getFilters(user);
  }

  async searchTeachers(user: IAuthUser, search: string) {
    const whereInSchool =
      user.role === RolesEnum.DIRECTOR
        ? { directors: { user } }
        : {
            tenant: {
              admins: { user },
            },
          };

    const teachers = await this.teacherService.findBy({
      where: this.teacherComplianceTaskService
        .getUserSearchFields(search)
        .map((property) => ({
          user: {
            ...property,
          },
          courses: {
            school: {
              ...whereInSchool,
            },
          },
        })),
      take: 10,
    });
    return teachers;
  }
}
