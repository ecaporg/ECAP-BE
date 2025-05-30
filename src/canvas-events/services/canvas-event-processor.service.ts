import { firstValueFrom } from 'rxjs';
import { DeepPartial } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { NotFoundException } from '@/core';
import { TeacherSchoolYearEnrollmentEntity } from '@/enrollment/entities/teacher-enrollment.entity';
import { TeacherSchoolYearEnrollmentService } from '@/enrollment/services/teacher-enrollment.service';
import { AcademyEntity } from '@/school/entities/academy.entity';
import { SchoolEntity } from '@/school/entities/school.entity';
import { TeacherService } from '@/staff/services/staff.service';
import { StudentEntity } from '@/students/entities/student.entity';
import { StudentService } from '@/students/services/student.service';
import { KeyEntity } from '@/tenant/entities/key.entity';
import { TenantEntity } from '@/tenant/entities/tenant.entity';
import { TenantService } from '@/tenant/services/tenant.service';
import { AcademicYearEntity } from '@/track/entities/academic-year.entity';
import { SubjectEntity } from '@/track/entities/subject.entity';
import { AcademicYearService } from '@/track/services/academic-year.service';
import { UserEntity } from '@/users/entities/user.entity';
import { RolesEnum } from '@/users/enums/roles.enum';
import { UsersService } from '@/users/users.service';

import {
  CanvasCourseDto,
  CanvasEventDto,
  CanvasEventType,
  CanvasSubmissionCreatedEventDto,
  CanvasSubmissionUpdatedEventDto,
  CanvasUserDto,
} from '../dto';

import { CanvasResourcesService } from './canvas-resources.service';

export class CanvasProcessorService {
  constructor(
    protected readonly tenantService: TenantService,
    protected readonly studentService: StudentService,
    protected readonly academicYearService: AcademicYearService,
    protected readonly userService: UsersService,
    protected readonly teacherService: TeacherService,
    protected readonly canvasResourcesService: CanvasResourcesService,
    protected readonly teacherSchoolYearEnrollmentService: TeacherSchoolYearEnrollmentService,
  ) {}

  protected async getAllData(event: CanvasEventDto, key: KeyEntity) {
    const enrollment = await firstValueFrom(
      this.canvasResourcesService.fetchEnrollment(
        key,
        event.metadata.user_account_id,
        event.metadata.context_id,
      ),
    );

    const assignment = await firstValueFrom(
      this.canvasResourcesService.fetchAssignment(
        key,
        enrollment.course_id,
        event.body.assignment_id,
      ),
    );

    const course = await firstValueFrom(
      this.canvasResourcesService.fetchCourse(key, enrollment.course_id),
    );

    const teachers = await firstValueFrom(
      this.canvasResourcesService.fetchTeachersInCourse(
        key,
        enrollment.course_id,
      ),
    );

    const user = await firstValueFrom(
      this.canvasResourcesService.fetchUsersInAccount(
        key,
        event.metadata.user_account_id,
        event.metadata.user_id,
      ),
    );

    return { enrollment, assignment, course, teachers, user };
  }

  protected async getOrCreateTeachersEnrolemts(
    teachers: CanvasUserDto[],
    tenant: TenantEntity,
    currentAcademicYear: AcademicYearEntity,
  ) {
    const setOfTeacherEnrolemts: Map<
      number,
      TeacherSchoolYearEnrollmentEntity[]
    > = new Map();
    const allTeacherEnrolemts = tenant.schools.flatMap(
      (school) => school.teacher_school_year_enrollments,
    );

    for (const teacher of teachers) {
      const teacherEnrolemt = allTeacherEnrolemts.filter(
        (teacherEnrolemt) =>
          teacherEnrolemt.teacher.user.email == teacher.email,
      );

      if (teacherEnrolemt.length > 0) {
        setOfTeacherEnrolemts.set(teacher.id, [
          ...(setOfTeacherEnrolemts.get(teacher.id) || []),
          ...teacherEnrolemt,
        ]);
      } else {
        setOfTeacherEnrolemts.set(teacher.id, [
          ...(setOfTeacherEnrolemts.get(teacher.id) || []),
          ...(await this.createTeacherAndEnrolemt(
            teacher,
            tenant,
            currentAcademicYear,
          )),
        ]);
      }
    }

    return Array.from(setOfTeacherEnrolemts.values()).flat();
  }

  protected async createTeacherAndEnrolemt(
    teacher: CanvasUserDto,
    tenant: TenantEntity,
    currentAcademicYear: AcademicYearEntity,
  ): Promise<TeacherSchoolYearEnrollmentEntity[]> {
    try {
      const user = await this.userService.findOneBy(
        {
          email: teacher.email,
        },
        {
          teacher: {
            teacher_school_year_enrollments: true,
          },
        },
      );

      if (
        user.teacher &&
        user.teacher.teacher_school_year_enrollments.length > 0
      ) {
        const schools = new Set(
          user.teacher.teacher_school_year_enrollments.map(
            (enrolemt) => enrolemt.school_id,
          ),
        );

        const newEnrolemts = Promise.all(
          tenant.schools
            .filter((school) => schools.has(school.id))
            .map((school) =>
              this.teacherSchoolYearEnrollmentService.create({
                school,
                teacher: user.teacher,
                academic_year: currentAcademicYear,
              }),
            ),
        );

        return newEnrolemts;
      }

      return [];
    } catch (error) {
      if (error instanceof NotFoundException) {
        const user = await this.userService.create({
          email: teacher.email,
          password: '',
          name: teacher.name,
          isActive: true,
          emailVerified: true,
          role: RolesEnum.TEACHER,
          canvas_additional_info: {
            canvas_id: teacher.id,
            avatar_url: teacher.avatar_url,
            time_zone: teacher.time_zone,
          } as any,
        });

        const newTeacher = await this.teacherService.create({
          user,
        });

        const newTeacherEnrolemts = await Promise.all(
          tenant.schools.map((school) =>
            this.teacherSchoolYearEnrollmentService.create({
              school,
              teacher: newTeacher,
              academic_year: currentAcademicYear,
            } as DeepPartial<TeacherSchoolYearEnrollmentEntity>),
          ),
        );

        return newTeacherEnrolemts;
      }
    }
  }

  protected async getOrCreateStudent(
    person: CanvasUserDto,
    academy?: AcademyEntity,
    school?: SchoolEntity,
  ): Promise<StudentEntity> {
    try {
      return await this.studentService.findOneBy({
        user: {
          canvas_additional_info: {
            canvas_id: person.id,
          },
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        const user = await this.userService.create({
          email: person.email
            ? `${person.id}+${person.email}`
            : `${person.id}@test.com`,
          password: '',
          name: person.name,
          isActive: true,
          emailVerified: true,
          role: RolesEnum.STUDENT,
          canvas_additional_info: {
            canvas_id: person.id,
            sis_user_id: person.sis_user_id,
            sis_import_id: person.sis_import_id,
            avatar_url: person.avatar_url,
            time_zone: person.time_zone,
            track_name: null,
            grade: -1,
          },
        });

        const student = await this.studentService.create({
          user,
          academy_id: academy?.id,
          school_id: school?.id,
        } as StudentEntity);

        return student;
      }
    }
  }

  protected async findTenantByRootAccountId(rootAccountId: string) {
    const currentAcademicYear =
      await this.academicYearService.findCurrentAcademicYears();

    const tenant = await this.tenantService.findOneBy(
      {
        root_id: Number(rootAccountId),
        schools: {
          teacher_school_year_enrollments: {
            academic_year: {
              id: currentAcademicYear[0].id,
            },
          },
        },
      },
      {
        key: true,
        schools: {
          teacher_school_year_enrollments: {
            teacher: {
              user: true,
            },
            academic_year: true,
          },
        },
      },
    );

    return { tenant, currentAcademicYear: currentAcademicYear[0] };
  }
}

@Injectable()
export class CanvasEventProcessorService extends CanvasProcessorService {
  async processCanvasEvent(event: CanvasEventDto): Promise<void> {
    const { tenant, currentAcademicYear } =
      await this.findTenantByRootAccountId(event.metadata.root_account_id);

    await this.handleEventByType(event, tenant, currentAcademicYear);
  }

  private async handleEventByType(
    event: CanvasEventDto,
    tenant: TenantEntity,
    currentAcademicYear: AcademicYearEntity,
  ): Promise<void> {
    switch (event.metadata.event_name) {
      case CanvasEventType.SUBMISSION_CREATED:
        await this.handleSubmissionCreated(
          event as CanvasSubmissionCreatedEventDto,
          tenant,
          currentAcademicYear,
        );
        break;

      case CanvasEventType.SUBMISSION_UPDATED:
        await this.handleSubmissionUpdated(
          event as CanvasSubmissionUpdatedEventDto,
          tenant,
        );
        break;
    }
  }

  private async handleSubmissionCreated(
    event: CanvasSubmissionCreatedEventDto,
    tenant: TenantEntity,
    currentAcademicYear: AcademicYearEntity,
  ): Promise<void> {
    const { enrollment, assignment, course, teachers, user } =
      await this.getAllData(event, tenant.key);

    const teacher_enrolemts = await this.getOrCreateTeachersEnrolemts(
      teachers,
      tenant,
      currentAcademicYear,
    );

    const student = await this.getOrCreateStudent(user[0]);
  }

  private async handleSubmissionUpdated(
    event: CanvasSubmissionUpdatedEventDto,
    tenant: TenantEntity,
  ): Promise<void> {}
}
