import { firstValueFrom } from 'rxjs';
import { DeepPartial, In, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { NotFoundException } from '../../core';
import { StudentLPEnrollmentEntity } from '../../enrollment/entities/student-enrollment.entity';
import { TeacherSchoolYearEnrollmentEntity } from '../../enrollment/entities/teacher-enrollment.entity';
import { StudentLPEnrollmentService } from '../../enrollment/services/student-enrollment.service';
import { TeacherSchoolYearEnrollmentService } from '../../enrollment/services/teacher-enrollment.service';
import { TeacherEntity } from '../../staff/entities/staff.entity';
import { TeacherService } from '../../staff/services/staff.service';
import {
  SampleEntity,
  SampleStatus,
} from '../../students/entities/sample.entity';
import { StudentEntity } from '../../students/entities/student.entity';
import { SampleService } from '../../students/services/sample.service';
import { StudentService } from '../../students/services/student.service';
import { KeyEntity } from '../../tenant/entities/key.entity';
import { TenantEntity } from '../../tenant/entities/tenant.entity';
import { ErrorService } from '../../tenant/services/error.service';
import { TenantService } from '../../tenant/services/tenant.service';
import { AcademicYearEntity } from '../../track/entities/academic-year.entity';
import { SubjectEntity } from '../../track/entities/subject.entity';
import { TrackEntity } from '../../track/entities/track.entity';
import { TrackLearningPeriodEntity } from '../../track/entities/track-learning-period.entity';
import { AcademicYearService } from '../../track/services/academic-year.service';
import { SubjectService } from '../../track/services/subject.service';
import { TrackLearningPeriodService } from '../../track/services/track-learning-period.service';
import { RolesEnum } from '../../users/enums/roles.enum';
import { UsersService } from '../../users/users.service';

import {
  CanvasAssignmentDto,
  CanvasCourseDto,
  CanvasEventDto,
  CanvasEventType,
  CanvasSubmissionCreatedEventDto,
  CanvasSubmissionDto,
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
    protected readonly learningPeriodService: TrackLearningPeriodService,
    protected readonly subjectService: SubjectService,
    protected readonly studentLPEnrollmentService: StudentLPEnrollmentService,
    protected readonly sampleService: SampleService,
    protected readonly errorService: ErrorService,
  ) {}

  protected async getAllData(event: CanvasEventDto, key: KeyEntity) {
    const enrollment = await firstValueFrom(
      this.canvasResourcesService.fetchEnrollment(
        key,
        event.body.user_id,
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

    const submission = await firstValueFrom(
      this.canvasResourcesService.fetchSubmission(
        key,
        enrollment.course_id,
        event.body.assignment_id,
        event.body.user_id,
      ),
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

    return { enrollment, assignment, course, teachers, user, submission };
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

      if (user.teacher.teacher_school_year_enrollments.length > 0) {
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
      } else {
        const newTeacherEnrolemts = await Promise.all(
          tenant.schools.map((school) =>
            this.teacherSchoolYearEnrollmentService.create({
              school,
              teacher: user.teacher,
              academic_year: currentAcademicYear,
            } as DeepPartial<TeacherSchoolYearEnrollmentEntity>),
          ),
        );

        return newTeacherEnrolemts;
      }
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
      } else {
        throw error;
      }
    }
  }

  protected async getOrCreateStudent(
    person: CanvasUserDto,
    tenant: TenantEntity,
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
        } as StudentEntity);

        await this.errorService.create({
          tenant,
          message:
            'Create new student without academy, school, and track. JSON: ' +
            JSON.stringify(user),
        });

        return student;
      } else {
        throw error;
      }
    }
  }

  protected async findSubjectWithLearningPeriod(
    assignment: CanvasAssignmentDto,
    course: CanvasCourseDto,
    tracks: TrackEntity[],
    student: StudentEntity,
  ): Promise<SubjectEntity[]> {
    const subjects = await this.subjectService.findBy({
      where: {
        canvas_course_id: course.id.toString(),
        track: {
          learningPeriods: {
            start_date: LessThanOrEqual(new Date(assignment.due_at)),
            end_date: MoreThanOrEqual(new Date(assignment.due_at)),
          },
        },
      },
      relations: {
        track: {
          learningPeriods: true,
        },
      },
    });

    if (subjects.length === 0) {
      await this.subjectService.create({
        name: course.name
          .replaceAll(/\b\d{0,2}[ABKX]\b/g, '')
          .replaceAll('Flex', '')
          .trim(),
        track: tracks.find((track) =>
          student.user.canvas_additional_info.track_name
            ? track.name === student.user.canvas_additional_info.track_name
            : true,
        ),
        canvas_course_id: course.id.toString(),
        canvas_additional_info: {
          account_id: course.account_id,
          course_code: course.course_code,
          enrollment_term_id: course.enrollment_term_id,
          uuid: course.uuid,
        } as Record<string, any>,
      });

      return this.findSubjectWithLearningPeriod(
        assignment,
        course,
        tracks,
        student,
      );
    }

    return subjects.map((subject) => ({
      ...subject,
      track: {
        ...subject.track,
        learningPeriods: subject.track.learningPeriods.filter(
          (learning_period) =>
            new Date(learning_period.start_date) <=
              new Date(assignment.due_at) &&
            new Date(learning_period.end_date) >= new Date(assignment.due_at),
        ),
      },
    }));
  }

  protected async getOrCreateStudentEnrolemts(
    student: StudentEntity,
    learning_periods: TrackLearningPeriodEntity[],
    teacher_enrolemts: TeacherSchoolYearEnrollmentEntity[],
  ) {
    const student_enrolemts = await this.studentLPEnrollmentService.findBy({
      where: {
        student,
        learning_period: In(
          learning_periods.map((learning_period) => learning_period.id),
        ),
        teacher_school_year_enrollment_id: In(
          teacher_enrolemts.map((enrolemt) => enrolemt.id),
        ),
      },
    });

    if (student_enrolemts.length === 0) {
      return await Promise.all(
        teacher_enrolemts.flatMap((enrolemt) =>
          learning_periods.map((learning_period) =>
            this.studentLPEnrollmentService.create({
              student,
              learning_period,
              teacher_school_year_enrollment: enrolemt,
              completed: false,
              track_id: learning_period.track_id,
            }),
          ),
        ),
      );
    }

    return student_enrolemts;
  }

  protected async createSamples(
    student_enrolemts: StudentLPEnrollmentEntity[],
    subjects: SubjectEntity[],
    assignment: CanvasAssignmentDto,
    submission: CanvasSubmissionDto,
    teacher: TeacherEntity,
  ) {
    const status =
      submission.missing || submission.workflow_state === 'unsubmitted'
        ? SampleStatus.MISSING_SAMPLE
        : !submission.grade || !assignment?.name
          ? SampleStatus.ERRORS_FOUND
          : submission.workflow_state === 'graded'
            ? SampleStatus.COMPLETED
            : SampleStatus.PENDING;

    return {
      assignment_title: assignment?.name,
      grade: submission.grade,
      date: submission.submitted_at
        ? new Date(submission.submitted_at)
        : undefined,
      status,
      subject: subjects[0],
      preview_url: submission.preview_url,
      student_lp_enrollments: student_enrolemts,
      canvas_submission_id: submission.id ? Number(submission.id) : undefined,
      done_by_id: status == SampleStatus.COMPLETED ? teacher.id : undefined,
    } as SampleEntity;
  }

  protected async updateSample(
    submission: CanvasSubmissionDto,
    assignment: CanvasAssignmentDto,
    teachers: CanvasUserDto[],
  ) {
    const sample = await this.sampleService.findOneBy({
      canvas_submission_id: submission.id ? Number(submission.id) : undefined,
    });

    sample.status =
      submission.missing || submission.workflow_state === 'unsubmitted'
        ? SampleStatus.MISSING_SAMPLE
        : !submission.grade || !assignment?.name
          ? SampleStatus.ERRORS_FOUND
          : submission.workflow_state === 'graded'
            ? SampleStatus.COMPLETED
            : SampleStatus.PENDING;

    sample.assignment_title = assignment?.name;
    sample.grade = submission.grade;
    sample.date = submission.submitted_at
      ? new Date(submission.submitted_at)
      : undefined;
    sample.preview_url = submission.preview_url;
    if (!sample.done_by_id && sample.status == SampleStatus.COMPLETED) {
      const teacherDto = teachers.find(
        (teacher) => teacher.id == submission.user_id,
      );

      if (teacherDto) {
        const teacher = await this.teacherService.findOneBy({
          user: {
            email: teacherDto.email,
          },
        });

        sample.done_by_id = teacher ? teacher.id : undefined;
      }
    }

    return this.sampleService.save(sample);
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
        tracks: {
          academic_year_id: currentAcademicYear[0].id,
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
        tracks: {
          learningPeriods: true,
        },
      },
    );

    return { tenant, currentAcademicYear: currentAcademicYear[0] };
  }
}

@Injectable()
export class CanvasEventProcessorService extends CanvasProcessorService {
  constructor(
    protected readonly tenantService: TenantService,
    protected readonly studentService: StudentService,
    protected readonly academicYearService: AcademicYearService,
    protected readonly userService: UsersService,
    protected readonly teacherService: TeacherService,
    protected readonly canvasResourcesService: CanvasResourcesService,
    protected readonly teacherSchoolYearEnrollmentService: TeacherSchoolYearEnrollmentService,
    protected readonly learningPeriodService: TrackLearningPeriodService,
    protected readonly subjectService: SubjectService,
    protected readonly studentLPEnrollmentService: StudentLPEnrollmentService,
    protected readonly sampleService: SampleService,
    protected readonly errorService: ErrorService,
  ) {
    super(
      tenantService,
      studentService,
      academicYearService,
      userService,
      teacherService,
      canvasResourcesService,
      teacherSchoolYearEnrollmentService,
      learningPeriodService,
      subjectService,
      studentLPEnrollmentService,
      sampleService,
      errorService,
    );
  }

  async processCanvasEvent(event: CanvasEventDto) {
    const { tenant, currentAcademicYear } =
      await this.findTenantByRootAccountId('1'); //replace root_id on domain for more reliable search. Example:  eliteaa.instructure.com

    try {
      await this.handleEventByType(event, tenant, currentAcademicYear);
    } catch (error) {
      this.errorService.create({
        tenant,
        message: `Error processing canvas event: ${error.message}, event: ${JSON.stringify(event)}`,
      });
      throw error;
    }
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
    const { assignment, course, teachers, user, submission } =
      await this.getAllData(event, tenant.key);

    const teacher_enrolemts = await this.getOrCreateTeachersEnrolemts(
      teachers,
      tenant,
      currentAcademicYear,
    );

    const student = await this.getOrCreateStudent(user[0], tenant);

    const subjects = await this.findSubjectWithLearningPeriod(
      assignment,
      course,
      tenant.tracks,
      student,
    );

    const student_enrolemts = await this.getOrCreateStudentEnrolemts(
      student,
      subjects.flatMap((subject) => subject.track.learningPeriods),
      teacher_enrolemts,
    );

    await this.createSamples(
      student_enrolemts,
      subjects,
      assignment,
      submission,
      teacher_enrolemts[0].teacher,
    );
  }

  private async handleSubmissionUpdated(
    event: CanvasSubmissionUpdatedEventDto,
    tenant: TenantEntity,
  ): Promise<void> {
    const { submission, assignment, teachers } = await this.getAllData(
      event,
      tenant.key,
    );

    await this.updateSample(submission, assignment, teachers);
  }
}
