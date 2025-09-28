import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { RolesEnum } from '../../../auth/enums/roles.enum';
import { AuthUser } from '../../../auth/types/auth-user';
import {
  ApiArrayResponse,
  ApiCrudResponse,
  ApiErrorResponses,
  ApiPaginatedCrudResponse,
  CurrentUser,
  QueryParamMapperInterceptor,
  Roles,
} from '../../../core';
import { StudentLPEnrollmentEntity } from '../../../domain/enrollment/entities/student-enrollment.entity';
import { StudentEntity } from '../../../domain/students/entities/student.entity';
import { TenantEntity } from '../../../domain/tenant/entities/tenant.entity';
import {
  filterMapping,
  StudentSamplesFilterDto,
  StudentSearchFilterDto,
  StudentsTableFilterDto,
} from '../dto/filters.dto';
import { StudentSearchFilterInterceptor } from '../interceptors/student-search-filter.interceptor';
import { TeacherFilterInterceptor } from '../interceptors/teacher-filter.interceptor';
import { TeacherComplianceTaskService } from '../services/teacher.service';

@ApiTags('Teacher Compliance Tasks')
@Controller('students-table')
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
  @UseInterceptors(
    TeacherFilterInterceptor,
    new QueryParamMapperInterceptor(filterMapping, {
      sortBy: 'student.user.name',
    }),
  )
  @ApiOperation({ summary: 'Get table with students' })
  @ApiPaginatedCrudResponse(StudentLPEnrollmentEntity)
  async getStudents(@Query() filters: StudentsTableFilterDto) {
    return this.teacherComplianceTaskService.getStudents(filters);
  }

  @Get('filters')
  @ApiOperation({ summary: 'Get available filters for students table' })
  @ApiCrudResponse(TenantEntity)
  async getFilters(@CurrentUser() user: AuthUser) {
    return this.teacherComplianceTaskService.getFilters(user);
  }

  @Get('subjects')
  @UseInterceptors(
    TeacherFilterInterceptor,
    new QueryParamMapperInterceptor(filterMapping, {
      sortBy: 'assignments.assignment.course.name',
    }),
  )
  @ApiOperation({ summary: 'Get table with student samples' })
  @ApiPaginatedCrudResponse(StudentLPEnrollmentEntity)
  async getStudentSamples(@Query() filters: StudentSamplesFilterDto) {
    return this.teacherComplianceTaskService.getStudentSamples(filters);
  }

  @Get('students/:search')
  @UseInterceptors(StudentSearchFilterInterceptor)
  @ApiOperation({ summary: 'Search students' })
  @ApiErrorResponses()
  @ApiArrayResponse(StudentEntity)
  async searchStudents(
    @Param('search') search: string,
    @Query() filters: StudentSearchFilterDto,
  ) {
    return this.teacherComplianceTaskService.searchStudents(search, filters);
  }
}
