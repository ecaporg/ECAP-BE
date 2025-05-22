/* eslint-disable @typescript-eslint/no-unused-vars */
import * as argon2 from 'argon2';
import { readFileSync } from 'fs';
import { Assignment } from 'migrations/elite-data/assignments';
import { Course } from 'migrations/elite-data/courses';
import { People } from 'migrations/elite-data/students';
import { Submission } from 'migrations/elite-data/submitions';
import { MigrationInterface, QueryRunner } from 'typeorm';

import { StudentLPEnrollmentEntity } from '@/enrollment/entities/student-enrollment.entity';
import { TeacherSchoolYearEnrollmentEntity } from '@/enrollment/entities/teacher-enrollment.entity';
import {
  AdminEntity,
  DirectorEntity,
  TeacherEntity,
} from '@/staff/entities/staff.entity';
import { SampleFlagMissingWorkEntity } from '@/students/entities/sample-flag.entity';
import { SampleFlagErrorEntity } from '@/students/entities/sample-flag.entity';
import { AcademicYearEntity } from '@/track/entities/academic-year.entity';
import { SemesterEntity } from '@/track/entities/semester.entity';
import { TrackCalendarEntity } from '@/track/entities/track-calendar.entity';
import { RolesEnum } from '@/users/enums/roles.enum';

import { AcademyEntity } from '../src/school/entities/academy.entity';
import { SchoolEntity } from '../src/school/entities/school.entity';
import {
  SampleEntity,
  SampleFlagCategory,
  SampleStatus,
} from '../src/students/entities/sample.entity';
import { StudentEntity } from '../src/students/entities/student.entity';
import { TenantEntity } from '../src/tenant/entities/tenant.entity';
import { SubjectEntity } from '../src/track/entities/subject.entity';
import { TrackEntity } from '../src/track/entities/track.entity';
import { TrackLearningPeriodEntity } from '../src/track/entities/track-learning-period.entity';
import { UserEntity } from '../src/users/entities/user.entity';

export class AddEliteData201746984777855 implements MigrationInterface {
  private password: string;

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create a tenant
    this.password = await argon2.hash('password');

    const tenant = await this.createTenant(queryRunner);

    // Create schools
    const schools = await this.createSchool(queryRunner, tenant);

    // Create academies
    const academies = await this.createAcademy(queryRunner, tenant);

    // Create directors
    await this.createDirectors(queryRunner, academies, tenant);

    // Create academic years (including historical data)
    const academicYears = await this.createAcademicYears(queryRunner);

    // Create teachers and enrollments for all schools and academic years
    const { enrollments } = await this.createTeachersAndEnrollments(
      queryRunner,
      schools,
      academicYears,
    );

    // Create students
    const students = await this.createStudents(queryRunner, schools, academies);

    for (const academicYear of academicYears) {
      // Create tracks
      const tracks = await this.createTracks(queryRunner, academicYear, tenant);

      // Create semesters for these tracks
      await this.createSemesters(queryRunner, tracks);

      for (let track_index = 0; track_index < tracks.length; track_index++) {
        const track = tracks[track_index];

        // Create learning periods
        const learningPeriods = await this.createLearningPeriods(
          queryRunner,
          track,
          academicYear,
        );

        // Create student LP enrollments
        const studentLPEnrollments = await this.createStudentLPEnrollments(
          queryRunner,
          learningPeriods,
          students,
          enrollments,
          track,
          academicYear,
        );

        // Create subjects
        const subjects = await this.createSubjects(queryRunner, track);

        // Create samples for students
        // Create sample flags
        // await this.createSampleFlags(
        // queryRunner,
        await this.createSamples(queryRunner, studentLPEnrollments, subjects);
        // );
      }
    }

    // Create admin user
    await this.createAdmin(queryRunner, tenant);

    // await this.recalculateAssignmentPeriods(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // truncate all tables and reset sequences
    await queryRunner.manager.query(
      'TRUNCATE TABLE "tenants" RESTART IDENTITY CASCADE',
    );
    await queryRunner.manager.query(
      'TRUNCATE TABLE "schools" RESTART IDENTITY CASCADE',
    );
    await queryRunner.manager.query(
      'TRUNCATE TABLE "academies" RESTART IDENTITY CASCADE',
    );
    await queryRunner.manager.query(
      'TRUNCATE TABLE "users" RESTART IDENTITY CASCADE',
    );
    await queryRunner.manager.query(
      'TRUNCATE TABLE "directors" RESTART IDENTITY CASCADE',
    );
    await queryRunner.manager.query(
      'TRUNCATE TABLE "teachers" RESTART IDENTITY CASCADE',
    );
    await queryRunner.manager.query(
      'TRUNCATE TABLE "students" RESTART IDENTITY CASCADE',
    );
    await queryRunner.manager.query(
      'TRUNCATE TABLE "tracks" RESTART IDENTITY CASCADE',
    );
    await queryRunner.manager.query(
      'TRUNCATE TABLE "subjects" RESTART IDENTITY CASCADE',
    );
    await queryRunner.manager.query(
      'TRUNCATE TABLE "track_calendar" RESTART IDENTITY CASCADE',
    );
    await queryRunner.manager.query(
      'TRUNCATE TABLE "track_learning_periods" RESTART IDENTITY CASCADE',
    );
    await queryRunner.manager.query(
      'TRUNCATE TABLE "samples" RESTART IDENTITY CASCADE',
    );

    await queryRunner.manager.query(
      'TRUNCATE TABLE "semesters" RESTART IDENTITY CASCADE',
    );
    await queryRunner.manager.query(
      'TRUNCATE TABLE "academic_years" RESTART IDENTITY CASCADE',
    );
    await queryRunner.manager.query(
      'TRUNCATE TABLE "teacher_school_year_enrollments" RESTART IDENTITY CASCADE',
    );
    await queryRunner.manager.query(
      'TRUNCATE TABLE "student_lp_enrollments" RESTART IDENTITY CASCADE',
    );
  }

  private createTenant(queryRunner: QueryRunner): Promise<TenantEntity> {
    return queryRunner.manager.save(TenantEntity, {
      name: 'Elite',
    });
  }

  private createSchool(
    queryRunner: QueryRunner,
    tenant: TenantEntity,
  ): Promise<SchoolEntity[]> {
    return queryRunner.manager.save(SchoolEntity, [
      { name: 'Mountain Empire', tenant } as SchoolEntity,
      { name: 'Lucerne', tenant } as SchoolEntity,
    ]);
  }

  private createAcademy(
    queryRunner: QueryRunner,
    tenant: TenantEntity,
  ): Promise<AcademyEntity[]> {
    return queryRunner.manager.save(AcademyEntity, [
      { name: 'Homeschool', tenant },
      { name: 'Flex', tenant },
      { name: 'Virtual', tenant },
    ]);
  }

  private async createDirectors(
    queryRunner: QueryRunner,
    academies: AcademyEntity[],
    tenant: TenantEntity,
  ): Promise<DirectorEntity[]> {
    // const director_users = await queryRunner.manager.save(
    //   UserEntity,
    //   academies.map(
    //     (academy, idx) =>
    //       ({
    //         email: `director${idx}@test.com`,
    //         password: this.password,
    //         name: 'Director',
    //         isActive: true,
    //         emailVerified: true,
    //         role: RolesEnum.DIRECTOR,
    //       }) as UserEntity,
    //   ),
    // );
    // const directors = await queryRunner.manager.save(
    //   DirectorEntity,
    //   academies.map(
    //     (academy, idx) =>
    //       ({
    //         user: director_users[idx],
    //         academy,
    //         tenant,
    //       }) as DirectorEntity,
    //   ),
    // );
    // return directors;
    return [];
  }

  private createAcademicYears(
    queryRunner: QueryRunner,
  ): Promise<AcademicYearEntity[]> {
    return queryRunner.manager.save(AcademicYearEntity, [
      { from: 2024, to: 2025 },
    ]);
  }

  private async createSemesters(
    queryRunner: QueryRunner,
    tracks: TrackEntity[],
  ) {
    for (const track of tracks) {
      const semester1StartDate = new Date(track.start_date);
      const semester2EndDate = new Date(track.end_date);
      const semester1EndDate = new Date(
        `${semester1StartDate.getFullYear()}-01-16T00:00:00.000Z`,
      );
      const semester2StartDate = new Date(
        `${semester1StartDate.getFullYear()}-06-17T00:00:00.000Z`,
      );
      await queryRunner.manager.save(SemesterEntity, [
        {
          name: `Semester 1 for ${track.name}`,
          track_id: track.id,
          start_date: semester1StartDate,
          end_date: semester1EndDate,
        },
        {
          name: `Semester 2 for ${track.name}`,
          track_id: track.id,
          start_date: semester2StartDate,
          end_date: semester2EndDate,
        },
      ]);
    }
  }

  private async createTeachersAndEnrollments(
    queryRunner: QueryRunner,
    schools: SchoolEntity[],
    academicYears: AcademicYearEntity[],
  ) {
    const global_teachers = [] as TeacherEntity[];
    const enrollments = [] as TeacherSchoolYearEnrollmentEntity[];
    const peoples = JSON.parse(
      readFileSync('migrations/elite-data/teachers.json', 'utf8'),
    ) as People[];

    const teacher_users = await queryRunner.manager.save(
      UserEntity,
      peoples.map(
        (person) =>
          ({
            email: person.email,
            password: this.password,
            name: person.name,
            isActive: true,
            emailVerified: true,
            role: RolesEnum.TEACHER,
            canvas_additional_info: {
              canvas_id: person.id,
              sis_user_id: person.sis_user_id,
              sis_import_id: person.sis_import_id,
              avatar_url: person.avatar_url,
              time_zone: person.time_zone,
            } as Record<string, any>,
          }) as UserEntity,
      ),
    );

    const teachers = await queryRunner.manager.save(
      TeacherEntity,
      teacher_users.map(
        (user) =>
          ({
            user,
          }) as TeacherEntity,
      ),
    );

    for (const school of schools) {
      for (const academicYear of academicYears) {
        for (const teacher of teachers) {
          enrollments.push({
            school,
            teacher,
            academic_year: academicYear,
          } as TeacherSchoolYearEnrollmentEntity);
        }
      }
      global_teachers.push(...teachers);
    }

    await queryRunner.manager.save(
      TeacherSchoolYearEnrollmentEntity,
      enrollments,
    );

    return { global_teachers, enrollments };
  }

  private async createTracks(
    queryRunner: QueryRunner,
    academicYear: AcademicYearEntity,
    tenant: TenantEntity,
  ) {
    const tracks = await queryRunner.manager.save(TrackEntity, [
      {
        name: `Track A`,
        tenant,
        start_date: new Date(academicYear.from, 7, 1),
        end_date: new Date(academicYear.to, 6, 10),
        academicYear,
      } as TrackEntity,
      {
        name: `Track B`,
        tenant,
        start_date: new Date(academicYear.from, 8, 27),
        end_date: new Date(academicYear.to, 6, 10),
        academicYear,
      } as TrackEntity,
    ]);

    await queryRunner.manager.save(TrackCalendarEntity, [
      {
        track: tracks[0],
        days: [],
      } as TrackCalendarEntity,
      {
        track: tracks[1],
        days: [],
      } as TrackCalendarEntity,
    ]);

    return tracks;
  }

  private async createSubjects(
    queryRunner: QueryRunner,
    track: TrackEntity,
  ): Promise<SubjectEntity[]> {
    const courses = JSON.parse(
      readFileSync('migrations/elite-data/courses.json', 'utf8'),
    ) as Course[];
    const assignments = JSON.parse(
      readFileSync('migrations/elite-data/assignments-filtered.json', 'utf8'),
    ) as Assignment[];
    const subjects = courses
      .filter(
        (course) =>
          course.term.name.includes(
            `${track.academicYear.from}/${track.academicYear.to}`,
          ) &&
          assignments.some((assignment) => assignment.course_id == course.id),
      )
      .map((course) => ({
        name: course.name,
        track,
        canvas_course_id: course.id,
        canvas_additional_info: {
          sis_course_id: course.sis_course_id,
          sis_import_id: course.sis_import_id,
          account_id: course.account_id,
          course_code: course.course_code,
          enrollment_term_id: course.enrollment_term_id,
          uuid: course.uuid,
        } as Record<string, any>,
      })) as SubjectEntity[];
    return queryRunner.manager.save(SubjectEntity, subjects);
  }

  private async createStudents(
    queryRunner: QueryRunner,
    schools: SchoolEntity[],
    academies: AcademyEntity[],
  ) {
    const peoples = JSON.parse(
      readFileSync('migrations/elite-data/students.json', 'utf8'),
    ) as People[];
    const users = await queryRunner.manager.save(
      UserEntity,
      peoples.map(
        (person) =>
          ({
            email: person.email
              ? `${person.id}+${person.email}`
              : `${person.id}@test.com`,
            password: this.password,
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
              track_name: person.sis?.schooltracks_title
                ? `Track ${person.sis.schooltracks_title}`
                : null,
            } as Record<string, any>,
          }) as UserEntity,
      ),
    );

    const students = await queryRunner.manager.save(
      StudentEntity,
      users.map((user) => {
        const person = peoples.find(
          (p) => p.id == user.canvas_additional_info.canvas_id,
        );

        const school = schools.find(
          (s) =>
            s.name ==
            (person?.sis?.scope_title == 'mountainelite'
              ? 'Mountain Empire'
              : 'Lucerne'),
        );

        const academy = academies.find((a) => a.name == person?.sis?.lc_name);

        return {
          user,
          academy_id: academy?.id,
          school_id: school?.id,
        } as StudentEntity;
      }),
    );

    return students;
  }

  private async createLearningPeriods(
    queryRunner: QueryRunner,
    track: TrackEntity,
    academicYear: AcademicYearEntity,
  ) {
    let learningPeriods = [] as TrackLearningPeriodEntity[];
    if (track.name == 'Track A') {
      learningPeriods = [
        {
          name: `LP1`,
          track,
          start_date: new Date(academicYear.from, 6, 1),
          end_date: new Date(academicYear.from, 7, 3),
        },
        {
          name: `LP2`,
          track,
          start_date: new Date(academicYear.from, 7, 5),
          end_date: new Date(academicYear.from, 7, 27),
        },
        {
          name: `LP3`,
          track,
          start_date: new Date(academicYear.from, 7, 28),
          end_date: new Date(academicYear.from, 9, 4),
        },
        {
          name: `LP4`,
          track,
          start_date: new Date(academicYear.from, 9, 7),
          end_date: new Date(academicYear.from, 10, 22),
        },
        {
          name: `LP5`,
          track,
          start_date: new Date(academicYear.from, 11, 2),
          end_date: new Date(academicYear.to, 0, 17),
        },
        {
          name: `LP6`,
          track,
          start_date: new Date(academicYear.to, 0, 22),
          end_date: new Date(academicYear.to, 1, 14),
        },
        {
          name: `LP7`,
          track,
          start_date: new Date(academicYear.to, 1, 18),
          end_date: new Date(academicYear.to, 2, 21),
        },
        {
          name: `LP8`,
          track,
          start_date: new Date(academicYear.to, 2, 24),
          end_date: new Date(academicYear.to, 4, 3),
        },
        {
          name: `LP9`,
          track,
          start_date: new Date(academicYear.to, 4, 5),
          end_date: new Date(academicYear.to, 5, 10),
        },
      ] as TrackLearningPeriodEntity[];
    } else {
      learningPeriods = [
        {
          name: `LP1`,
          track,
          start_date: new Date(academicYear.from, 7, 28),
          end_date: new Date(academicYear.from, 9, 4),
        },
        {
          name: `LP2`,
          track,
          start_date: new Date(academicYear.from, 9, 7),
          end_date: new Date(academicYear.from, 10, 22),
        },
        {
          name: `LP3`,
          track,
          start_date: new Date(academicYear.from, 11, 2),
          end_date: new Date(academicYear.to, 0, 17),
        },
        {
          name: `LP4`,
          track,
          start_date: new Date(academicYear.to, 0, 22),
          end_date: new Date(academicYear.to, 1, 13),
        },
        {
          name: `LP5`,
          track,
          start_date: new Date(academicYear.to, 1, 18),
          end_date: new Date(academicYear.to, 2, 21),
        },
        {
          name: `LP6`,
          track,
          start_date: new Date(academicYear.to, 2, 24),
          end_date: new Date(academicYear.to, 4, 2),
        },
        {
          name: `LP7`,
          track,
          start_date: new Date(academicYear.to, 4, 5),
          end_date: new Date(academicYear.to, 5, 10),
        },
      ] as TrackLearningPeriodEntity[];
    }
    learningPeriods = await queryRunner.manager.save(
      TrackLearningPeriodEntity,
      learningPeriods,
    );

    return learningPeriods;
  }

  private async createStudentLPEnrollments(
    queryRunner: QueryRunner,
    learningPeriods: TrackLearningPeriodEntity[],
    students: StudentEntity[],
    enrollments: TeacherSchoolYearEnrollmentEntity[],
    track: TrackEntity,
    academicYear: AcademicYearEntity,
  ) {
    const filtered_enrollments = enrollments.filter(
      (as) => as.academic_year_id == academicYear.id,
    );
    const teacherStudentRelation = JSON.parse(
      readFileSync(
        'migrations/elite-data/teacher-student-relation.json',
        'utf8',
      ),
    ) as Record<string, string[]>;

    const assignmentPeriods = [];
    for (const enrollment of filtered_enrollments) {
      const local_assignmentPeriods = [];
      const filteredStudents = students.filter(
        (student) =>
          student.school_id == enrollment.school_id &&
          student.user.canvas_additional_info.track_name == track.name,
      );
      for (const student of filteredStudents) {
        if (!enrollment.teacher.user.canvas_additional_info)
          throw new Error('Teacher has no additional info');

        if (
          !teacherStudentRelation[
            student.user.canvas_additional_info.canvas_id
          ]?.includes(enrollment.teacher.user.canvas_additional_info.canvas_id)
        ) {
          continue;
        }

        for (const learningPeriod of learningPeriods) {
          local_assignmentPeriods.push({
            teacher_school_year_enrollment: enrollment,
            student,
            learning_period: learningPeriod,
            completed: false,
            percentage: 0,
            track_id: track.id,
            student_grade:
              student.user.canvas_additional_info.lccgradelevels_gradelevel,
          } as StudentLPEnrollmentEntity);
        }
      }
      assignmentPeriods.push(
        ...(await queryRunner.manager.save(
          StudentLPEnrollmentEntity,
          local_assignmentPeriods,
        )),
      );
    }
    return assignmentPeriods;
  }

  private async createSamples(
    queryRunner: QueryRunner,
    studentLPEnrollments: StudentLPEnrollmentEntity[],
    subjects: SubjectEntity[],
  ) {
    const samples: SampleEntity[] = [];

    const submissions = (
      JSON.parse(
        readFileSync('migrations/elite-data/submissions.json', 'utf8'),
      ) as Submission[][]
    ).flatMap((e) => e);

    const assignmentsMap = new Map<string, Assignment>(
      JSON.parse(
        readFileSync('migrations/elite-data/assignments-filtered.json', 'utf8'),
      ).map((assignment: Assignment) => [assignment.id.toString(), assignment]),
    );

    const coursesMap = new Map<string, Course>(
      JSON.parse(
        readFileSync('migrations/elite-data/courses.json', 'utf8'),
      ).map((course: Course) => [course.id.toString(), course]),
    );

    const subjectMap = new Map<string, SubjectEntity>(
      subjects.map((s) => [s.canvas_course_id, s]),
    );

    for (const studentLPEnrollment of studentLPEnrollments) {
      const assignmentPerLPMap = new Map<string, Assignment>(
        Array.from(assignmentsMap.values())
          .filter((a) => {
            const due_at = new Date(a.due_at);
            return (
              due_at >=
                new Date(studentLPEnrollment.learning_period.start_date) &&
              due_at <= new Date(studentLPEnrollment.learning_period.end_date)
            );
          })
          .map((a) => [a.id.toString(), a]),
      );

      const studentSubmitions = submissions.filter(
        (s) =>
          s.user_id ==
            studentLPEnrollment.student.user.canvas_additional_info.canvas_id &&
          assignmentPerLPMap.has(s.assignment_id),
      );

      samples.push(
        ...(studentSubmitions.map((s) => {
          const assignment = assignmentPerLPMap.get(s.assignment_id);
          const course = coursesMap.get(assignment.course_id);
          const subject = subjectMap.get(course.id);

          const status = !s.submitted_at
            ? SampleStatus.MISSING_SAMPLE
            : !s.grade
              ? SampleStatus.ERRORS_FOUND
              : SampleStatus.PENDING;

          const flag_category = !s.submitted_at
            ? SampleFlagCategory.MISSING_SAMPLE
            : !s.grade
              ? SampleFlagCategory.ERROR_IN_SAMPLE
              : null;

          return {
            assignment_title: assignmentPerLPMap.get(s.assignment_id)?.name,
            grade: s.grade,
            date: s.submitted_at ? new Date(s.submitted_at) : undefined,
            status,
            student_lp_enrollment_id: studentLPEnrollment.id,
            subject,
            flag_category,
            preview_url: s.preview_url,
          } as SampleEntity;
        }) as SampleEntity[]),
      );
    }
    return await queryRunner.manager.save(SampleEntity, samples, {
      chunk: 1000,
    });
  }

  private async createSampleFlags(
    queryRunner: QueryRunner,
    samples: SampleEntity[],
  ) {
    const sample_flag_errors = samples.filter(
      (sample) => sample.status == SampleStatus.ERRORS_FOUND,
    );
    const sample_flag_missing_work = samples.filter(
      (sample) => sample.status == SampleStatus.MISSING_SAMPLE,
    );

    await queryRunner.manager.save(
      SampleFlagErrorEntity,
      sample_flag_errors.map(
        (sample) =>
          ({
            sample,
            comment: 'Grade is missing',
          }) as SampleFlagErrorEntity,
      ),
    );
    await queryRunner.manager.save(
      SampleFlagMissingWorkEntity,
      sample_flag_missing_work.map(
        (sample) =>
          ({
            sample,
            reason: 'No submission',
          }) as SampleFlagMissingWorkEntity,
      ),
    );
  }

  private async createAdmin(queryRunner: QueryRunner, tenant: TenantEntity) {
    const cheredia = await queryRunner.manager.findOne(UserEntity, {
      where: { email: 'cheredia@eliteacademic.com' },
    });
    const admin = await queryRunner.manager.save(UserEntity, [
      {
        email: 'admin@test.com',
        password: await argon2.hash('password'),
        name: 'Admin',
        isActive: true,
        emailVerified: true,
        role: RolesEnum.SUPER_ADMIN,
      },
      {
        email: 'rgonzalez@eliteacademic.com',
        password: await argon2.hash('password'),
        name: 'Rachel Gonzalez',
        isActive: true,
        emailVerified: true,
        role: RolesEnum.SUPER_ADMIN,
      },
      {
        ...cheredia,
        role: RolesEnum.SUPER_ADMIN,
      },
    ]);

    await queryRunner.manager.save(
      AdminEntity,
      admin.map((user) => ({
        user,
        tenant,
      })),
    );
  }

  private async recalculateAssignmentPeriods(queryRunner: QueryRunner) {
    const assignment_periods = await queryRunner.manager.find(
      StudentLPEnrollmentEntity,
      {
        where: {
          completed: false,
        },
        relations: { samples: true },
      },
    );
    for (const assignment_period of assignment_periods) {
      assignment_period.percentage =
        (assignment_period.samples.filter(
          (sample) => sample.status == SampleStatus.COMPLETED,
        ).length /
          assignment_period.samples.length) *
        100;
    }
    await queryRunner.manager.save(
      StudentLPEnrollmentEntity,
      assignment_periods,
    );
  }

  private async deleteRedunantData(queryRunner: QueryRunner) {}
}
