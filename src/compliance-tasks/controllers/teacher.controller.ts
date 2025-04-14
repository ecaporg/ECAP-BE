import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { IAuthUser } from '@/auth/types/auth-user';
import {
  ApiPaginatedCrudResponse,
  ApiPaginationQueries,
  CurrentUser,
  Roles,
} from '@/core';
import { StudentEntity } from '@/students/entities/student.entity';
import { RolesEnum } from '@/users/enums/roles.enum';

import { StudentsTableFilterDto } from '../dto/filters.dto';
import { TeacherComplianceTaskService } from '../services/teacher.service';

@ApiTags('Teacher Compliance Tasks')
@Controller('teacher-compliance-tasks')
@Roles(
  RolesEnum.ADMIN,
  RolesEnum.TEACHER,
  RolesEnum.DIRECTOR,
  RolesEnum.SUPER_ADMIN,
)
export class TeacherComplianceTaskController {
  constructor(
    private readonly teacherComplianceTaskService: TeacherComplianceTaskService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get table with students' })
  @ApiPaginatedCrudResponse(StudentEntity)
  @ApiPaginationQueries()
  async getStudents(
    @CurrentUser() user: IAuthUser,
    @Query() filters: StudentsTableFilterDto,
  ) {
    return this.teacherComplianceTaskService.getStudents(filters, user);
  }
}
