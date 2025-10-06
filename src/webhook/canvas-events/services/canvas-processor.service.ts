import { DeepPartial, ILike, In, Like } from 'typeorm';

import { Injectable, Logger } from '@nestjs/common';

import { RolesEnum } from '../../../auth/enums/roles.enum';
import { UsersService } from '../../../auth/services/users.service';
import { NotFoundException } from '../../../core';
import { StudentLPEnrollmentEntity } from '../../../domain/enrollment/entities/student-enrollment.entity';
import { TeacherEnrollmentEntity } from '../../../domain/enrollment/entities/teacher-enrollment.entity';
import { StudentLPEnrollmentService } from '../../../domain/enrollment/services/student-enrollment.service';
import { StudentLPEnrollmentAssignmentService } from '../../../domain/enrollment/services/student-enrollment-assignment.service';
import { TeacherEnrollmentService } from '../../../domain/enrollment/services/teacher-enrollment.service';
import { TeacherService } from '../../../domain/staff/services/staff.service';
import {
  SampleEntity,
  SampleStatus,
} from '../../../domain/students/entities/sample.entity';
import { StudentEntity } from '../../../domain/students/entities/student.entity';
import { SampleService } from '../../../domain/students/services/sample.service';
import { StudentService } from '../../../domain/students/services/student.service';
import { CourseEntity } from '../../../domain/subject/entities/course.entity';
import { CourseAssignmentService } from '../../../domain/subject/services/assignment.service';
import { CourseService } from '../../../domain/subject/services/course.service';
import { TenantEntity } from '../../../domain/tenant/entities/tenant.entity';
import { TenantService } from '../../../domain/tenant/services/tenant.service';
import { AcademicYearEntity } from '../../../domain/track/entities/academic-year.entity';
import { TrackLearningPeriodEntity } from '../../../domain/track/entities/track-learning-period.entity';
import { AcademicYearService } from '../../../domain/track/services/academic-year.service';
import { TrackLearningPeriodService } from '../../../domain/track/services/track-learning-period.service';
import {
  CanvasAssignmentDto,
  CanvasCourseDto,
  CanvasSubmissionDto,
  CanvasUserDto,
  ProcessCourseDto,
  ProcessEnrollmentDto,
  ProcessErrorDto,
  ProcessSubmissionDto,
} from '../dto';

@Injectable()
export class CanvasProcessorService {
  private readonly logger = new Logger(CanvasProcessorService.name);

  constructor(
    private readonly tenantService: TenantService,
    private readonly studentService: StudentService,
    private readonly academicYearService: AcademicYearService,
    private readonly userService: UsersService,
    private readonly teacherService: TeacherService,
    private readonly teacherEnrollmentService: TeacherEnrollmentService,
    private readonly studentLPEnrollmentService: StudentLPEnrollmentService,
    private readonly studentLPEnrollmentAssignmentService: StudentLPEnrollmentAssignmentService,
    private readonly sampleService: SampleService,
    private readonly courseService: CourseService,
    private readonly courseAssignmentService: CourseAssignmentService,
    private readonly trackLearningPeriodsService: TrackLearningPeriodService,
  ) {}

  public async updateCourse(data: ProcessCourseDto) {
    let course = await this.courseService
      .findOneBy(
        {
          canvas_id: data.course.id.toString(),
        },
        {
          assignments: true,
        },
      )
      .catch(() => null);

    const [assignments, learningPeriods] =
      await this.filterAssignmentsWithDueDate(
        data.currentAcademicYear.id,
        data.assignments,
        data.course,
      );

    if (course && course.assignments && course.assignments.length > 0) {
      this.courseService.save({
        ...course,
        name: data.course.name,
      });
    } else if (course) {
      course = await this.courseService.save({
        ...course,
        name: data.course.name,
        assignments: assignments.map((assignment) => ({
          canvas_id: assignment.id.toString(),
          name: assignment.name,
          due_at: assignment.due_at,
        })),
      });
    } else {
      course = await this.courseService.create({
        canvas_id: data.course.id.toString(),
        name: data.course.name,
        assignments: assignments.map((assignment) => ({
          canvas_id: assignment.id.toString(),
          name: assignment.name,
          due_at: assignment.due_at,
        })),
        tenant: data.tenant,
      });
    }

    const filteredTeachers = await this.getOrCreateTeachersEnrolemts(
      data.teachers,
      data.currentAcademicYear,
    );

    await this.createStudentLPEnrollments(
      course,
      assignments,
      learningPeriods,
      data.students,
      filteredTeachers,
      data.tenant.schools[0],
    );
  }

  public async updateAssignment(
    tenant: TenantEntity,
    assignment: CanvasAssignmentDto,
  ) {
    const assignments = await this.courseAssignmentService
      .findOneBy({
        canvas_id: assignment.id.toString(),
      })
      .catch(() => null);

    if (assignments) {
      return this.courseAssignmentService.save({
        ...assignments,
        name: assignment.name,
      });
    }

    if (!this.isAssignmentValid(assignment)) return null;

    // const course = await this.courseService.findOneBy({
    //   canvas_id: assignment.course_id.toString(),
    // });

    // const newAssignment = this.courseAssignmentService.create({
    //   due_at: assignment.due_at,
    //   name: assignment.name,
    //   canvas_id: assignment.id.toString(),
    //   course,
    // });

    // return newAssignment;
  }

  public async updateSubmission(data: ProcessSubmissionDto) {
    const sample = await this.sampleService
      .findOneBy(
        {
          canvas_id: data.submission.id.toString(),
        },
        {},
      )
      .catch(() => null);

    if (sample) {
      return await this.updateSample(
        sample,
        data.submission,
        data.assignment,
        data.teachers,
      );
    }

    const student_lp_enrollment_assignment =
      await this.studentLPEnrollmentAssignmentService
        .findOneBy({
          student_lp_enrollment: {
            student: {
              user: {
                email: data.user.email,
              },
            },
          },
          assignment: {
            canvas_id: data.assignment.id.toString(),
          },
        })
        .catch(() => null);

    if (!student_lp_enrollment_assignment) {
      return;
    }

    return await this.updateSample(
      {
        student_lp_enrollment_assignment: student_lp_enrollment_assignment,
        canvas_id: data.submission.id.toString(),
      } as SampleEntity,
      data.submission,
      data.assignment,
      data.teachers,
    );
  }

  protected async filterAssignmentsWithDueDate(
    academic_year_id: number,
    assignments: CanvasAssignmentDto[],
    course: CanvasCourseDto,
  ): Promise<[CanvasAssignmentDto[], TrackLearningPeriodEntity[]]> {
    const courseTrackMatch = course.name.match(
      /\b\d*([A-C])\b|[\(\[]([A-C])[\)\]]/,
    );
    const trackLetter = courseTrackMatch
      ? courseTrackMatch[1] || courseTrackMatch[2]
      : 'A';

    const filteredLearningPeriods =
      await this.trackLearningPeriodsService.findBy({
        where: {
          track: {
            name: Like(`%${trackLetter}%`),
            academic_year_id,
          },
        },
        relations: {
          track: true,
        },
      });

    assignments = assignments.filter(this.isAssignmentValid).sort((a, b) => {
      return new Date(b.due_at).getTime() - new Date(a.due_at).getTime();
    });

    const twoAssignmentsPerPeriodPerCourse: CanvasAssignmentDto[] = [];
    const usedLPs: TrackLearningPeriodEntity[] = [];
    for (const period of filteredLearningPeriods) {
      let firstAssignment: CanvasAssignmentDto | undefined;
      let secondAssignment: CanvasAssignmentDto | undefined;

      const severalAssignmentsPerPeriod = assignments.filter((assignment) => {
        return new Date(assignment.due_at) <= new Date(period.end_date);
      });

      if (severalAssignmentsPerPeriod.length < 2) {
        console.log(
          'Not found enough assignments for period:',
          period.end_date,
          'And course_id:',
          course.id,
        );
        continue;
      }

      const online_quizes = severalAssignmentsPerPeriod.filter((assignment) => {
        return assignment.submission_types.includes('online_quiz');
      });

      if (online_quizes.length < 2) {
        if (online_quizes.length === 1) {
          firstAssignment = online_quizes[0];
          secondAssignment = severalAssignmentsPerPeriod.find((assignment) => {
            return assignment.id !== firstAssignment?.id;
          });
        } else {
          firstAssignment = severalAssignmentsPerPeriod[0];
          secondAssignment = severalAssignmentsPerPeriod[1];
        }
      } else {
        firstAssignment = online_quizes[0];
        secondAssignment = online_quizes[1];
      }

      firstAssignment['learning_period'] = period as any;
      secondAssignment['learning_period'] = period as any;

      usedLPs.push(period);
      twoAssignmentsPerPeriodPerCourse.push(firstAssignment, secondAssignment);
    }

    return [twoAssignmentsPerPeriodPerCourse.filter(Boolean), usedLPs];
  }

  protected async getOrCreateTeachersEnrolemts(
    teachers: CanvasUserDto[],
    currentAcademicYear: AcademicYearEntity,
  ) {
    const setOfTeacherEnrolemts: Map<number, TeacherEnrollmentEntity[]> =
      new Map();
    const allTeacherEnrolemts = await this.teacherEnrollmentService.findBy({
      where: {
        teacher: {
          user: {
            email: In(teachers.map((teacher) => teacher.email)),
          },
        },
        academic_year: {
          id: currentAcademicYear[0].id,
        },
      },
      relations: {
        teacher: {
          user: true,
        },
      },
    });

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
          await this.createTeacherAndEnrollment(teacher, currentAcademicYear),
        ]);
      }
    }

    return Array.from(setOfTeacherEnrolemts.values()).flat();
  }

  protected async createTeacherAndEnrollment(
    teacher: CanvasUserDto,
    currentAcademicYear: AcademicYearEntity,
  ): Promise<TeacherEnrollmentEntity> {
    try {
      const user = await this.userService.findOneBy(
        {
          email: teacher.email,
        },
        {
          teacher: {
            teacher_enrollments: true,
          },
        },
      );

      const newEnrollment = await this.teacherEnrollmentService.create({
        teacher: user.teacher,
        academic_year: currentAcademicYear,
      });
      return newEnrollment;
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
          },
        });

        const newTeacher = await this.teacherService.create({
          user,
        });

        const newEnrollment = await this.teacherEnrollmentService.create({
          teacher: newTeacher,
          academic_year: currentAcademicYear,
        } as DeepPartial<TeacherEnrollmentEntity>);

        return newEnrollment;
      } else {
        throw error;
      }
    }
  }

  protected async createStudentLPEnrollments(
    course: CourseEntity,
    canvasAssignments: CanvasAssignmentDto[],
    learningPeriods: TrackLearningPeriodEntity[],
    students: CanvasUserDto[],
    teacher_school_enrollment: TeacherEnrollmentEntity[],
    defaultSchool: TenantEntity['schools'][0],
  ) {
    const studentLPEnrollmentPeriods: StudentLPEnrollmentEntity[] = [];
    const studentLPEnrollmentAssignments: StudentLPEnrollmentEntity['assignments'] =
      [];
    const db_students = await this.getAndCreateStudents(
      students,
      defaultSchool.id,
    );

    for (const person of students) {
      const student = db_students.find((s) => s.user.email === person.email);
      if (!student) continue;

      for (const learningPeriod of learningPeriods) {
        const assignments = course.assignments
          .filter(
            (assignment) =>
              canvasAssignments.find(
                (a) => a.id.toString() === assignment.canvas_id,
              )?.['learning_period']?.id === learningPeriod.id,
          )
          .map((assignment) => ({ assignment }));

        if (assignments.length === 0) continue;

        const currentLPEnrollment = student.student_lp_enrollments.find(
          (enrollment) => enrollment.learning_period_id == learningPeriod.id,
        );

        if (currentLPEnrollment) {
          assignments.forEach((a) => {
            if (
              !currentLPEnrollment.assignments.find(
                (existing) => existing.assignment_id == a.assignment.id,
              )
            )
              studentLPEnrollmentAssignments.push({
                ...a,
                student_lp_enrollment: currentLPEnrollment,
              } as any);
          });
        } else {
          studentLPEnrollmentPeriods.push({
            student,
            learning_period: learningPeriod,
            completed: false,
            percentage: 0,
            student_grade: `Grade ${student.user.canvas_additional_info.grade}`,
            teacher_enrollments: teacher_school_enrollment,
            assignments: assignments,
          } as StudentLPEnrollmentEntity);
        }
      }
    }
    await this.studentLPEnrollmentService.bulkCreate(
      studentLPEnrollmentPeriods,
    );
    await this.studentLPEnrollmentAssignmentService.bulkCreate(
      studentLPEnrollmentAssignments,
    );
  }

  protected async getAndCreateStudents(
    students: CanvasUserDto[],
    school_id: number,
  ): Promise<StudentEntity[]> {
    const db_students = await this.studentService.findBy({
      where: {
        user: {
          email: In(students.map((student) => student.email)),
        },
      },
      relations: {
        student_lp_enrollments: {
          assignments: true,
        },
        user: true,
      },
    });
    const newStudents = students.filter(
      (student) => !db_students.some((s) => s.user.email === student.email),
    );
    const createdStudents = await this.studentService.bulkCreate(
      newStudents
        .filter((person) => person.email)
        .map((person) => this.createStudent(person, school_id)),
    );
    return [...db_students, ...createdStudents];
  }

  public createStudent(
    person: CanvasUserDto,
    school_id: number,
  ): StudentEntity {
    const user = {
      email: person.email,
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
        track_name: `Track A`,
        grade: -1,
      },
    } as any;

    const student = {
      user,
      school_id,
    } as StudentEntity;

    return student;
  }

  public async updateSample(
    sample: SampleEntity,
    submission: CanvasSubmissionDto,
    assignment: CanvasAssignmentDto,
    teachers: CanvasUserDto[],
  ) {
    sample.status =
      submission.missing || submission.workflow_state === 'unsubmitted'
        ? SampleStatus.MISSING_SAMPLE
        : !submission.grade || !assignment?.name
          ? SampleStatus.ERRORS_FOUND
          : submission.workflow_state === 'graded'
            ? SampleStatus.COMPLETED
            : SampleStatus.PENDING;
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
        const teacher = await this.userService
          .findOneBy({
            email: teacherDto.email,
          })
          .catch(() => null);

        sample.done_by_id = teacher ? teacher.id : undefined;
      } else {
        sample.status = SampleStatus.PENDING;
      }
    }

    return this.sampleService.save(sample);
  }

  public async findTenantByDomain(domain: string) {
    try {
      const currentAcademicYear =
        await this.academicYearService.findCurrentAcademicYears();

      const tenant = await this.tenantService.findOneBy(
        {
          // teachers: {
          //   teacher_enrollments: {
          //     academic_year: {
          //       id: currentAcademicYear[0].id,
          //     },
          //   },
          // },
          // tracks: {
          //   academic_year_id: currentAcademicYear[0].id,
          // },
          key: {
            url: ILike(`%${domain}%`),
          },
        },
        {
          key: true,
          schools: true,
          // teachers: {
          //   teacher_enrollments: {
          //     academic_year: true,
          //   },
          //   user: true,
          // },
          // tracks: {
          //   learningPeriods: true,
          // },
        },
      );

      return { tenant, currentAcademicYear: currentAcademicYear[0] };
    } catch (error) {
      return {
        tenant: null,
        currentAcademicYear: null,
      };
    }
  }

  public async logError({ domain, event, error }: ProcessErrorDto) {
    const errorMessage = `Error processing canvas event: domain ${domain}, error: ${error.message}, event: ${JSON.stringify(
      event,
    )}`;
    this.logger.error(errorMessage);
  }

  protected isAssignmentValid(assignment: CanvasAssignmentDto): boolean {
    return Boolean(
      (!assignment.published && !assignment.unlock_at) ||
        assignment.anonymize_students ||
        assignment.anonymous_submissions ||
        assignment.submission_types.find((type) =>
          [
            'online_upload',
            'media_recording',
            'external_tool',
            'none',
            'on_paper',
          ].includes(type),
        ),
    );
  }

  public async processEnrollmentCreated(data: ProcessEnrollmentDto) {
    return this.updateCourse(data);
  }

  public async handleCourseDeletion(
    tenant: TenantEntity,
    course: CanvasCourseDto,
  ) {
    return this.courseService.delete({
      canvas_id: course.id.toString(),
      tenant_id: tenant.id,
    });
  }

  public async checkAssignment(id: string | number) {
    return this.courseAssignmentService
      .createBuilderQuery('course_assignment')
      .where(":id ILIKE CONCAT('%', canvas_id, '%')", { id: id.toString() })
      .getOne()
      .catch(() => null);
  }
}
