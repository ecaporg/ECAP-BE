import { DeepPartial, ILike, In } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { NotFoundException } from '../../../core';
import { StudentLPEnrollmentEntity } from '../../../domain/enrollment/entities/student-enrollment.entity';
import { TeacherSchoolYearEnrollmentEntity } from '../../../domain/enrollment/entities/teacher-enrollment.entity';
import { StudentLPEnrollmentService } from '../../../domain/enrollment/services/student-enrollment.service';
import { StudentLPEnrollmentAssignmentService } from '../../../domain/enrollment/services/student-enrollment-assignment.service';
import { TeacherSchoolYearEnrollmentService } from '../../../domain/enrollment/services/teacher-enrollment.service';
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
import { ErrorService } from '../../../domain/tenant/services/error.service';
import { TenantService } from '../../../domain/tenant/services/tenant.service';
import { AcademicYearEntity } from '../../../domain/track/entities/academic-year.entity';
import { TrackEntity } from '../../../domain/track/entities/track.entity';
import { TrackLearningPeriodEntity } from '../../../domain/track/entities/track-learning-period.entity';
import { AcademicYearService } from '../../../domain/track/services/academic-year.service';
import { TrackLearningPeriodService } from '../../../domain/track/services/track-learning-period.service';
import { RolesEnum } from '../../../domain/users/enums/roles.enum';
import { UsersService } from '../../../domain/users/users.service';
import {
  CanvasAssignmentDto,
  CanvasCourseDto,
  CanvasSubmissionDto,
  CanvasUserDto,
  ProcessCourseDto,
  ProcessErrorDto,
  ProcessSubmissionDto,
} from '../dto';

import { CanvasResourcesService } from './canvas-resources.service';

Injectable();
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
    protected readonly studentLPEnrollmentService: StudentLPEnrollmentService,
    protected readonly studentLPEnrollmentAssignmentService: StudentLPEnrollmentAssignmentService,
    protected readonly sampleService: SampleService,
    protected readonly errorService: ErrorService,
    protected readonly courseService: CourseService,
    protected readonly courseAssignmentService: CourseAssignmentService,
  ) {}

  public async updateCourse(data: ProcessCourseDto) {
    const subject = await this.courseService
      .findOneBy({
        canvas_id: data.course.id.toString(),
      })
      .catch(() => null);

    if (subject) {
      return this.courseService.save({
        ...subject,
        name: data.course.name,
      });
    }

    const [assignments, learningPeriods] = this.filterAssignmentsWithDueDate(
      data.tenant.tracks.flatMap((track) => track.learningPeriods),
      data.assignments,
      data.course,
    );

    const course = await this.courseService.create({
      canvas_id: data.course.id.toString(),
      name: data.course.name,
      assignments: assignments.map((assignment) => ({
        canvas_id: assignment.id.toString(),
        name: assignment.name,
        due_at: assignment.due_at,
      })),
      tenant: data.tenant,
    });

    const filteredTeachers = await this.getOrCreateTeachersEnrolemts(
      data.teachers,
      data.tenant,
      data.currentAcademicYear,
    );

    await this.createStudentLPEnrollments(
      course,
      assignments,
      learningPeriods,
      data.students,
      filteredTeachers,
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

    const course = await this.courseService.findOneBy({
      canvas_id: assignment.course_id.toString(),
    });

    const newAssignment = this.courseAssignmentService.create({
      due_at: assignment.due_at,
      name: assignment.name,
      canvas_id: assignment.id.toString(),
      course,
    });

    return newAssignment;
  }

  public async updateSubmission(data: ProcessSubmissionDto) {
    const sample = await this.sampleService
      .findOneBy({
        canvas_id: data.submission.id.toString(),
      })
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
      await this.studentLPEnrollmentAssignmentService.findOneBy({
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
      });

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

  public filterAssignmentsWithDueDate(
    learning_periods: TrackLearningPeriodEntity[],
    assignments: CanvasAssignmentDto[],
    course: CanvasCourseDto,
  ): [CanvasAssignmentDto[], TrackLearningPeriodEntity[]] {
    const courseTrackMatch = course.name.match(
      /\b\d*([A-C])\b|[\(\[]([A-C])[\)\]]/,
    );
    const trackLetter = courseTrackMatch
      ? courseTrackMatch[1] || courseTrackMatch[2]
      : 'A';

    const filteredLearningPeriods = learning_periods.filter((lp) =>
      lp.name.match(
        new RegExp(
          `\\b\\d*${trackLetter}\\b|[\\(\\[]${trackLetter}[\\)\\]]`,
          'g',
        ),
      ),
    );

    assignments = assignments.filter(this.isAssignmentValid).sort((a, b) => {
      return new Date(b.due_at).getTime() - new Date(a.due_at).getTime();
    });

    const twoAssignmentsPerPeriodPerCourse: CanvasAssignmentDto[] = [];
    const usedLPs: TrackLearningPeriodEntity[] = [];
    for (const period of filteredLearningPeriods) {
      const firstAssignment = assignments.find((assignment) => {
        return new Date(assignment.due_at) <= new Date(period.end_date);
      });

      const secondAssignment = assignments.find((assignment) => {
        return (
          new Date(assignment.due_at) <= new Date(period.end_date) &&
          assignment.id !== firstAssignment?.id
        );
      });

      if (!firstAssignment || !secondAssignment) {
        continue;
      }
      firstAssignment['learning_period'] = period as any;
      secondAssignment['learning_period'] = period as any;

      usedLPs.push(period);
      twoAssignmentsPerPeriodPerCourse.push(firstAssignment, secondAssignment);
    }

    return [twoAssignmentsPerPeriodPerCourse.filter(Boolean), usedLPs];
  }

  public async getOrCreateTeachersEnrolemts(
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

  public async createTeacherAndEnrolemt(
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

  public async createStudentLPEnrollments(
    course: CourseEntity,
    canvasAssignments: CanvasAssignmentDto[],
    learningPeriods: TrackLearningPeriodEntity[],
    students: CanvasUserDto[],
    teacher_school_enrollment: TeacherSchoolYearEnrollmentEntity[],
  ) {
    const studentLPEnrollmentPeriods: StudentLPEnrollmentEntity[] = [];
    const db_students = await this.getAndCreateStudents(
      students,
      teacher_school_enrollment[0].school_id,
    );

    for (const person of students) {
      const student = db_students.find((s) => s.user.email === person.email);

      for (const learningPeriod of learningPeriods) {
        const assignments = course.assignments
          .filter(
            (assignment) =>
              canvasAssignments.find(
                (a) => a.id.toString() === assignment.canvas_id,
              )?.['learning_period']?.id === learningPeriod.id,
          )
          .map((assignment) => ({ assignment }));

        studentLPEnrollmentPeriods.push({
          student,
          learning_period: learningPeriod,
          completed: false,
          percentage: 0,
          student_grade: `Grade ${student.user.canvas_additional_info.grade}`,
          teacher_school_year_enrollments: teacher_school_enrollment,
          assignments: assignments,
        } as StudentLPEnrollmentEntity);
      }
    }
    return await this.studentLPEnrollmentService.bulkCreate(
      studentLPEnrollmentPeriods,
    );
  }

  public async getAndCreateStudents(
    students: CanvasUserDto[],
    school_id: number,
  ): Promise<StudentEntity[]> {
    const db_students = await this.studentService.findBy({
      where: {
        user: {
          email: In(students.map((student) => student.email)),
        },
      },
    });
    const newStudents = students.filter(
      (student) => !db_students.some((s) => s.user.email === student.email),
    );
    const createdStudents = await this.studentService.bulkCreate(
      newStudents.map((person) => this.createStudent(person, school_id)),
    );
    return [...db_students, ...createdStudents];
  }

  public createStudent(
    person: CanvasUserDto,
    school_id: number,
  ): StudentEntity {
    const user = {
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
    } as any;

    const student = {
      user,
      school_id,
    } as StudentEntity;

    return student;
  }

  public async getOrCreateStudentEnrolemts(
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
        teacher_school_year_enrollments: In(
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
              teacher_school_year_enrollments: [enrolemt],
              completed: false,
              //@ts-ignore
              track_id: learning_period.track_id,
            }),
          ),
        ),
      );
    }

    return student_enrolemts;
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
        const teacher = await this.userService.findOneBy({
          email: teacherDto.email,
        });

        sample.done_by_id = teacher ? teacher.id : undefined;
      }
    } else if (
      sample.status === SampleStatus.ERRORS_FOUND &&
      !sample.flag_errors
    ) {
      sample.flag_errors = {
        comment: 'Errors found in work sample',
      } as any;
    } else if (
      sample.status === SampleStatus.MISSING_SAMPLE &&
      !sample.flag_missing_work
    ) {
      sample.flag_missing_work = {
        reason: 'Missing work',
      } as any;
    }

    return this.sampleService.save(sample);
  }

  public async findTenantByDomain(domain: string) {
    const currentAcademicYear =
      await this.academicYearService.findCurrentAcademicYears();

    const tenant = await this.tenantService.findOneBy(
      {
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
        key: {
          url: ILike(`%${domain}%`),
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

  public async logError({ tenant, domain, event, error }: ProcessErrorDto) {
    await this.errorService.create({
      tenant,
      message: `Error processing canvas event: domain ${domain}, error: ${error.message}, event: ${JSON.stringify(
        event,
      )}`,
    });
  }

  public isAssignmentValid(assignment: CanvasAssignmentDto): boolean {
    return (
      !!assignment.due_at &&
      assignment.published &&
      !assignment.anonymize_students &&
      !assignment.anonymous_submissions
    );
  }
}
