// /* eslint-disable @typescript-eslint/no-unused-vars */
// import * as argon2 from 'argon2';
// import { readFileSync } from 'fs';
// import { Assignment } from 'migrations/elite-data/assignments';
// import { Course } from 'migrations/elite-data/courses';
// import { People } from 'migrations/elite-data/students';
// import { Submission } from 'migrations/elite-data/submitions';
// import { StudentLPEnrollmentEntity } from 'src/enrollment/entities/student-enrollment.entity';
// import { TeacherSchoolYearEnrollmentEntity } from 'src/enrollment/entities/teacher-enrollment.entity';
// import { AcademyEntity } from 'src/school/entities/academy.entity';
// import { SchoolEntity } from 'src/school/entities/school.entity';
// import {
//   AdminEntity,
//   DirectorEntity,
//   TeacherEntity,
// } from 'src/staff/entities/staff.entity';
// import {
//   SampleEntity,
//   SampleStatus,
// } from 'src/students/entities/sample.entity';
// import {
//   SampleFlagErrorEntity,
//   SampleFlagMissingWorkEntity,
// } from 'src/students/entities/sample-flag.entity';
// import { StudentEntity } from 'src/students/entities/student.entity';
// import { KeyEntity } from 'src/tenant/entities/key.entity';
// import { TenantEntity } from 'src/tenant/entities/tenant.entity';
// import { AcademicYearEntity } from 'src/track/entities/academic-year.entity';
// import { SemesterEntity } from 'src/track/entities/semester.entity';
// import { SubjectEntity } from 'src/track/entities/subject.entity';
// import { TrackEntity } from 'src/track/entities/track.entity';
// import { TrackCalendarEntity } from 'src/track/entities/track-calendar.entity';
// import { TrackLearningPeriodEntity } from 'src/track/entities/track-learning-period.entity';
// import { UserEntity } from 'src/users/entities/user.entity';
// import { RolesEnum } from 'src/users/enums/roles.enum';
// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class AddEliteData2024200000000000 implements MigrationInterface {
//   private password: string;
//   public name = 'AddEliteData2024200000000000';

//   public async up(queryRunner: QueryRunner): Promise<void> {
//     // Create a tenant
//     this.password = await argon2.hash('password');

//     const tenant = await this.createTenant(queryRunner);

//     // Create schools
//     const schools = await this.createSchool(queryRunner, tenant);

//     // Create academies
//     const academies = await this.createAcademy(queryRunner, tenant);

//     // Create directors
//     await this.createDirectors(queryRunner, academies, tenant);

//     // Create academic years (including historical data)
//     const academicYears = await this.createAcademicYears(queryRunner);

//     // Create teachers and enrollments for all schools and academic years
//     const { enrollments } = await this.createTeachersAndEnrollments(
//       queryRunner,
//       schools,
//       academicYears,
//     );

//     // Create students
//     const students = await this.createStudents(queryRunner, schools, academies);

//     for (const academicYear of academicYears) {
//       // Create tracks
//       const tracks = await this.createTracks(queryRunner, academicYear, tenant);

//       // Create semesters for these tracks
//       await this.createSemesters(queryRunner, tracks);

//       for (let track_index = 0; track_index < tracks.length; track_index++) {
//         const track = tracks[track_index];

//         // Create learning periods
//         const learningPeriods = await this.createLearningPeriods(
//           queryRunner,
//           track,
//           academicYear,
//         );

//         // Create student LP enrollments
//         const studentLPEnrollments = await this.createStudentLPEnrollments(
//           queryRunner,
//           learningPeriods,
//           students,
//           enrollments,
//           track,
//           academicYear,
//         );

//         // Create subjects
//         const subjects = await this.createSubjects(queryRunner, track);

//         // Create samples for students
//         // Create sample flags
//         // await this.createSampleFlags(
//         // queryRunner,
//         const samples = await this.createSamples(
//           queryRunner,
//           studentLPEnrollments,
//           subjects,
//         );
//         // );

//         await this.deleteRedunantData(queryRunner, samples, subjects, track);
//       }
//     }

//     // Create admin user
//     await this.createAdmin(queryRunner, tenant);

//     await this.recalculateAssignmentPeriods(queryRunner);
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     // truncate all tables and reset sequences
//     await queryRunner.manager.query(
//       'TRUNCATE TABLE "tenants" RESTART IDENTITY CASCADE',
//     );
//     await queryRunner.manager.query(
//       'TRUNCATE TABLE "schools" RESTART IDENTITY CASCADE',
//     );
//     await queryRunner.manager.query(
//       'TRUNCATE TABLE "academies" RESTART IDENTITY CASCADE',
//     );
//     await queryRunner.manager.query(
//       'TRUNCATE TABLE "users" RESTART IDENTITY CASCADE',
//     );
//     await queryRunner.manager.query(
//       'TRUNCATE TABLE "directors" RESTART IDENTITY CASCADE',
//     );
//     await queryRunner.manager.query(
//       'TRUNCATE TABLE "teachers" RESTART IDENTITY CASCADE',
//     );
//     await queryRunner.manager.query(
//       'TRUNCATE TABLE "students" RESTART IDENTITY CASCADE',
//     );
//     await queryRunner.manager.query(
//       'TRUNCATE TABLE "tracks" RESTART IDENTITY CASCADE',
//     );
//     await queryRunner.manager.query(
//       'TRUNCATE TABLE "subjects" RESTART IDENTITY CASCADE',
//     );
//     await queryRunner.manager.query(
//       'TRUNCATE TABLE "track_calendar" RESTART IDENTITY CASCADE',
//     );
//     await queryRunner.manager.query(
//       'TRUNCATE TABLE "track_learning_periods" RESTART IDENTITY CASCADE',
//     );
//     await queryRunner.manager.query(
//       'TRUNCATE TABLE "samples" RESTART IDENTITY CASCADE',
//     );

//     await queryRunner.manager.query(
//       'TRUNCATE TABLE "semesters" RESTART IDENTITY CASCADE',
//     );
//     await queryRunner.manager.query(
//       'TRUNCATE TABLE "academic_years" RESTART IDENTITY CASCADE',
//     );
//     await queryRunner.manager.query(
//       'TRUNCATE TABLE "teacher_school_year_enrollments" RESTART IDENTITY CASCADE',
//     );
//     await queryRunner.manager.query(
//       'TRUNCATE TABLE "student_lp_enrollments" RESTART IDENTITY CASCADE',
//     );
//   }

//   private async createTenant(queryRunner: QueryRunner): Promise<TenantEntity> {
//     const tenant = await queryRunner.manager.save(TenantEntity, {
//       name: 'Elite',
//     });
//     await queryRunner.manager.save(KeyEntity, {
//       access_token: process.env.ELITE_KEY,
//       url: 'https://eliteaa.instructure.com',
//       session_token: process.env.ELITE_SESSION_TOKEN,
//       tenant,
//     });
//     return tenant;
//   }

//   private createSchool(
//     queryRunner: QueryRunner,
//     tenant: TenantEntity,
//   ): Promise<SchoolEntity[]> {
//     return queryRunner.manager.save(SchoolEntity, [
//       { name: 'Mountain Empire', tenant } as SchoolEntity,
//       { name: 'Lucerne', tenant } as SchoolEntity,
//     ]);
//   }

//   private createAcademy(
//     queryRunner: QueryRunner,
//     tenant: TenantEntity,
//   ): Promise<AcademyEntity[]> {
//     return queryRunner.manager.save(AcademyEntity, [
//       { name: 'Homeschool', tenant },
//       { name: 'Flex', tenant },
//       { name: 'Virtual', tenant },
//     ]);
//   }

//   private async createDirectors(
//     queryRunner: QueryRunner,
//     academies: AcademyEntity[],
//     tenant: TenantEntity,
//   ): Promise<DirectorEntity[]> {
//     const director_users = await queryRunner.manager.save(
//       UserEntity,
//       academies.map(
//         (academy, idx) =>
//           ({
//             email: `director${idx}@test.com`,
//             password: this.password,
//             name: 'Director',
//             isActive: true,
//             emailVerified: true,
//             role: RolesEnum.DIRECTOR,
//           }) as UserEntity,
//       ),
//     );
//     const directors = await queryRunner.manager.save(
//       DirectorEntity,
//       academies.map(
//         (academy, idx) =>
//           ({
//             user: director_users[idx],
//             academy,
//             tenant,
//           }) as DirectorEntity,
//       ),
//     );
//     return directors;
//   }

//   private createAcademicYears(
//     queryRunner: QueryRunner,
//   ): Promise<AcademicYearEntity[]> {
//     return queryRunner.manager.save(AcademicYearEntity, [
//       { from: 2024, to: 2025 },
//     ]);
//   }

//   private async createSemesters(
//     queryRunner: QueryRunner,
//     tracks: TrackEntity[],
//   ) {
//     for (const track of tracks) {
//       const semester1StartDate = new Date(track.start_date);
//       const semester2EndDate = new Date(track.end_date);
//       const semester1EndDate = new Date(
//         `${semester1StartDate.getFullYear()}-01-16T00:00:00.000Z`,
//       );
//       const semester2StartDate = new Date(
//         `${semester1StartDate.getFullYear()}-06-17T00:00:00.000Z`,
//       );
//       await queryRunner.manager.save(SemesterEntity, [
//         {
//           name: `Semester 1 for ${track.name}`,
//           track_id: track.id,
//           start_date: semester1StartDate,
//           end_date: semester1EndDate,
//         },
//         {
//           name: `Semester 2 for ${track.name}`,
//           track_id: track.id,
//           start_date: semester2StartDate,
//           end_date: semester2EndDate,
//         },
//       ]);
//     }
//   }

//   private async createTeachersAndEnrollments(
//     queryRunner: QueryRunner,
//     schools: SchoolEntity[],
//     academicYears: AcademicYearEntity[],
//   ) {
//     const global_teachers = [] as TeacherEntity[];
//     const enrollments = [] as TeacherSchoolYearEnrollmentEntity[];
//     const peoples = JSON.parse(
//       readFileSync('migrations/elite-data/teachers.json', 'utf8'),
//     ) as People[];

//     const teacher_users = await queryRunner.manager.save(
//       UserEntity,
//       peoples.map(
//         (person) =>
//           ({
//             email: person.email,
//             password: this.password,
//             name: person.name,
//             isActive: true,
//             emailVerified: true,
//             role: RolesEnum.TEACHER,
//             canvas_additional_info: {
//               canvas_id: person.id,
//               sis_user_id: person.sis_user_id,
//               sis_import_id: person.sis_import_id,
//               avatar_url: person.avatar_url,
//               time_zone: person.time_zone,
//             } as Record<string, any>,
//           }) as UserEntity,
//       ),
//     );

//     const teachers = await queryRunner.manager.save(
//       TeacherEntity,
//       teacher_users.map(
//         (user) =>
//           ({
//             user,
//           }) as TeacherEntity,
//       ),
//     );

//     for (const school of schools) {
//       for (const academicYear of academicYears) {
//         for (const teacher of teachers) {
//           enrollments.push({
//             school,
//             teacher,
//             academic_year: academicYear,
//           } as TeacherSchoolYearEnrollmentEntity);
//         }
//       }
//       global_teachers.push(...teachers);
//     }

//     await queryRunner.manager.save(
//       TeacherSchoolYearEnrollmentEntity,
//       enrollments,
//     );

//     return { global_teachers, enrollments };
//   }

//   private async createTracks(
//     queryRunner: QueryRunner,
//     academicYear: AcademicYearEntity,
//     tenant: TenantEntity,
//   ) {
//     const tracks = await queryRunner.manager.save(TrackEntity, [
//       {
//         name: `Track A`,
//         tenant,
//         start_date: new Date(academicYear.from, 7, 1),
//         end_date: new Date(academicYear.to, 6, 10),
//         academicYear,
//       } as TrackEntity,
//       {
//         name: `Track B`,
//         tenant,
//         start_date: new Date(academicYear.from, 8, 27),
//         end_date: new Date(academicYear.to, 6, 10),
//         academicYear,
//       } as TrackEntity,
//     ]);

//     await queryRunner.manager.save(TrackCalendarEntity, [
//       {
//         track: tracks[0],
//         days: [],
//       } as TrackCalendarEntity,
//       {
//         track: tracks[1],
//         days: [],
//       } as TrackCalendarEntity,
//     ]);

//     return tracks;
//   }

//   private async createSubjects(
//     queryRunner: QueryRunner,
//     track: TrackEntity,
//   ): Promise<SubjectEntity[]> {
//     const courses = JSON.parse(
//       readFileSync('migrations/elite-data/courses.json', 'utf8'),
//     ) as Course[];
//     const assignments = JSON.parse(
//       readFileSync('migrations/elite-data/assignments-filtered.json', 'utf8'),
//     ) as Assignment[];
//     const subjects = courses
//       .filter(
//         (course) =>
//           course.term.name.includes(
//             `${track.academicYear.from}/${track.academicYear.to}`,
//           ) &&
//           assignments.some((assignment) => assignment.course_id == course.id),
//       )
//       .map((course) => ({
//         name: course.name
//           .replaceAll(/\b\d{0,2}[ABKX]\b/g, '')
//           .replaceAll('Flex', '')
//           .trim(),
//         track,
//         canvas_course_id: course.id,
//         canvas_additional_info: {
//           sis_course_id: course.sis_course_id,
//           sis_import_id: course.sis_import_id,
//           account_id: course.account_id,
//           course_code: course.course_code,
//           enrollment_term_id: course.enrollment_term_id,
//           uuid: course.uuid,
//         } as Record<string, any>,
//       })) as SubjectEntity[];
//     return queryRunner.manager.save(SubjectEntity, subjects);
//   }

//   private async createStudents(
//     queryRunner: QueryRunner,
//     schools: SchoolEntity[],
//     academies: AcademyEntity[],
//   ) {
//     const peoples = JSON.parse(
//       readFileSync('migrations/elite-data/students.json', 'utf8'),
//     ) as People[];
//     const users = await queryRunner.manager.save(
//       UserEntity,
//       peoples.map(
//         (person) =>
//           ({
//             email: person.email
//               ? `${person.id}+${person.email}`
//               : `${person.id}@test.com`,
//             password: this.password,
//             name: person.name,
//             isActive: true,
//             emailVerified: true,
//             role: RolesEnum.STUDENT,
//             canvas_additional_info: {
//               canvas_id: person.id,
//               sis_user_id: person.sis_user_id,
//               sis_import_id: person.sis_import_id,
//               avatar_url: person.avatar_url,
//               time_zone: person.time_zone,
//               track_name: person.sis?.schooltracks_title
//                 ? `Track ${person.sis.schooltracks_title}`
//                 : null,
//               grade: person.sis?.lccgradelevels_gradelevel,
//             } as Record<string, any>,
//           }) as UserEntity,
//       ),
//     );

//     const students = await queryRunner.manager.save(
//       StudentEntity,
//       users.map((user) => {
//         const person = peoples.find(
//           (p) => p.id == user.canvas_additional_info.canvas_id,
//         );

//         const school = schools.find(
//           (s) =>
//             s.name ==
//             (person?.sis?.scope_title == 'mountainelite'
//               ? 'Mountain Empire'
//               : 'Lucerne'),
//         );

//         const academy = academies.find((a) => a.name == person?.sis?.lc_name);

//         return {
//           user,
//           academy_id: academy?.id,
//           school_id: school?.id,
//         } as StudentEntity;
//       }),
//     );

//     return students;
//   }

//   private async createLearningPeriods(
//     queryRunner: QueryRunner,
//     track: TrackEntity,
//     academicYear: AcademicYearEntity,
//   ) {
//     let learningPeriods = [] as TrackLearningPeriodEntity[];
//     if (track.name == 'Track A') {
//       learningPeriods = [
//         {
//           name: `LP1`,
//           track,
//           start_date: new Date(academicYear.from, 6, 1),
//           end_date: new Date(academicYear.from, 7, 3),
//         },
//         {
//           name: `LP2`,
//           track,
//           start_date: new Date(academicYear.from, 7, 5),
//           end_date: new Date(academicYear.from, 7, 27),
//         },
//         {
//           name: `LP3`,
//           track,
//           start_date: new Date(academicYear.from, 7, 28),
//           end_date: new Date(academicYear.from, 9, 4),
//         },
//         {
//           name: `LP4`,
//           track,
//           start_date: new Date(academicYear.from, 9, 7),
//           end_date: new Date(academicYear.from, 10, 22),
//         },
//         {
//           name: `LP5`,
//           track,
//           start_date: new Date(academicYear.from, 11, 2),
//           end_date: new Date(academicYear.to, 0, 17),
//         },
//         {
//           name: `LP6`,
//           track,
//           start_date: new Date(academicYear.to, 0, 22),
//           end_date: new Date(academicYear.to, 1, 14),
//         },
//         {
//           name: `LP7`,
//           track,
//           start_date: new Date(academicYear.to, 1, 18),
//           end_date: new Date(academicYear.to, 2, 21),
//         },
//         {
//           name: `LP8`,
//           track,
//           start_date: new Date(academicYear.to, 2, 24),
//           end_date: new Date(academicYear.to, 4, 3),
//         },
//         {
//           name: `LP9`,
//           track,
//           start_date: new Date(academicYear.to, 4, 5),
//           end_date: new Date(academicYear.to, 5, 10),
//         },
//       ] as TrackLearningPeriodEntity[];
//     } else {
//       learningPeriods = [
//         {
//           name: `LP1`,
//           track,
//           start_date: new Date(academicYear.from, 7, 28),
//           end_date: new Date(academicYear.from, 9, 4),
//         },
//         {
//           name: `LP2`,
//           track,
//           start_date: new Date(academicYear.from, 9, 7),
//           end_date: new Date(academicYear.from, 10, 22),
//         },
//         {
//           name: `LP3`,
//           track,
//           start_date: new Date(academicYear.from, 11, 2),
//           end_date: new Date(academicYear.to, 0, 17),
//         },
//         {
//           name: `LP4`,
//           track,
//           start_date: new Date(academicYear.to, 0, 22),
//           end_date: new Date(academicYear.to, 1, 13),
//         },
//         {
//           name: `LP5`,
//           track,
//           start_date: new Date(academicYear.to, 1, 18),
//           end_date: new Date(academicYear.to, 2, 21),
//         },
//         {
//           name: `LP6`,
//           track,
//           start_date: new Date(academicYear.to, 2, 24),
//           end_date: new Date(academicYear.to, 4, 2),
//         },
//         {
//           name: `LP7`,
//           track,
//           start_date: new Date(academicYear.to, 4, 5),
//           end_date: new Date(academicYear.to, 5, 10),
//         },
//       ] as TrackLearningPeriodEntity[];
//     }
//     learningPeriods = await queryRunner.manager.save(
//       TrackLearningPeriodEntity,
//       learningPeriods,
//     );

//     return learningPeriods;
//   }

//   private async createStudentLPEnrollments(
//     queryRunner: QueryRunner,
//     learningPeriods: TrackLearningPeriodEntity[],
//     students: StudentEntity[],
//     enrollments: TeacherSchoolYearEnrollmentEntity[],
//     track: TrackEntity,
//     academicYear: AcademicYearEntity,
//   ) {
//     const filtered_enrollments = enrollments.filter(
//       (as) => as.academic_year_id == academicYear.id,
//     );
//     const teacherStudentRelation = JSON.parse(
//       readFileSync(
//         'migrations/elite-data/teacher-student-relation.json',
//         'utf8',
//       ),
//     ) as Record<string, string[]>;

//     const assignmentPeriods = [];
//     for (const enrollment of filtered_enrollments) {
//       const local_assignmentPeriods = [];
//       const filteredStudents = students.filter(
//         (student) =>
//           student.school_id == enrollment.school_id &&
//           student.user.canvas_additional_info.track_name == track.name,
//       );
//       for (const student of filteredStudents) {
//         if (!enrollment.teacher.user.canvas_additional_info)
//           throw new Error('Teacher has no additional info');

//         if (
//           !teacherStudentRelation[
//             student.user.canvas_additional_info.canvas_id
//           ]?.includes(enrollment.teacher.user.canvas_additional_info.canvas_id)
//         ) {
//           continue;
//         }

//         for (const learningPeriod of learningPeriods) {
//           local_assignmentPeriods.push({
//             teacher_school_year_enrollment: enrollment,
//             student,
//             learning_period: learningPeriod,
//             completed: false,
//             percentage: 0,
//             track_id: track.id,
//             student_grade: `Grade ${student.user.canvas_additional_info.grade}`,
//           } as StudentLPEnrollmentEntity);
//         }
//       }
//       assignmentPeriods.push(
//         ...(await queryRunner.manager.save(
//           StudentLPEnrollmentEntity,
//           local_assignmentPeriods,
//         )),
//       );
//     }
//     return assignmentPeriods;
//   }

//   private async createSamples(
//     queryRunner: QueryRunner,
//     studentLPEnrollments: StudentLPEnrollmentEntity[],
//     subjects: SubjectEntity[],
//   ) {
//     const samples: SampleEntity[] = [];

//     const submissions = (
//       JSON.parse(
//         readFileSync('migrations/elite-data/submissions.json', 'utf8'),
//       ) as Submission[][]
//     ).flatMap((e) => e);

//     const assignmentsMap = new Map<number, Assignment>(
//       JSON.parse(
//         readFileSync('migrations/elite-data/assignments-filtered.json', 'utf8'),
//       ).map((assignment: Assignment) => [Number(assignment.id), assignment]),
//     );

//     const coursesMap = new Map<number, Course>(
//       JSON.parse(
//         readFileSync('migrations/elite-data/courses.json', 'utf8'),
//       ).map((course: Course) => [Number(course.id), course]),
//     );

//     const subjectMap = new Map<number, SubjectEntity>(
//       subjects.map((s) => [Number(s.canvas_course_id), s]),
//     );

//     const studentSubmitions = submissions.filter(
//       (submission) =>
//         !submission.excused &&
//         submission.user_id &&
//         studentLPEnrollments.some(
//           (s) =>
//             s.student.user.canvas_additional_info.canvas_id ==
//             submission.user_id.toString(),
//         ),
//     );

//     samples.push(
//       ...(studentSubmitions.map((s) => {
//         const assignment = assignmentsMap.get(Number(s.assignment_id));
//         const due_at = new Date(assignment.due_at);

//         const course = coursesMap.get(Number(assignment.course_id));
//         const subject = subjectMap.get(Number(course.id));

//         const enrollments = studentLPEnrollments.filter(
//           (se) =>
//             se.student.user.canvas_additional_info.canvas_id ==
//               s.user_id.toString() &&
//             due_at >= new Date(se.learning_period.start_date) &&
//             due_at <= new Date(se.learning_period.end_date),
//         );

//         const status =
//           s.missing || s.workflow_state === 'unsubmitted'
//             ? SampleStatus.MISSING_SAMPLE
//             : !s.grade || !assignment?.name
//               ? SampleStatus.ERRORS_FOUND
//               : s.workflow_state === 'graded'
//                 ? SampleStatus.COMPLETED
//                 : SampleStatus.PENDING;

//         return {
//           assignment_title: assignment?.name,
//           grade: s.grade,
//           date: s.submitted_at ? new Date(s.submitted_at) : undefined,
//           status,
//           subject,
//           preview_url: s.preview_url,
//           student_lp_enrollments: enrollments,
//           canvas_submission_id: s.id ? Number(s.id) : undefined,
//           done_by_id:
//             status == SampleStatus.COMPLETED
//               ? enrollments[0]?.teacher_school_year_enrollment?.teacher_id
//               : undefined,
//         } as SampleEntity;
//       }) as SampleEntity[]),
//     );
//     const res = await queryRunner.manager.save(SampleEntity, samples, {
//       chunk: 500,
//     });

//     // for (const studentLPEnrollment of studentLPEnrollments) {
//     //   const assignmentPerLPMap = new Map<number, Assignment>(
//     //     Array.from(assignmentsMap.values())
//     //       .filter((a) => {
//     //         const due_at = new Date(a.due_at);
//     //         return (
//     //           due_at >=
//     //             new Date(studentLPEnrollment.learning_period.start_date) &&
//     //           due_at <= new Date(studentLPEnrollment.learning_period.end_date)
//     //         );
//     //       })
//     //       .map((a) => [Number(a.id), a]),
//     //   );

//     //   const studentSubmitions = submissions.filter(
//     //     (s) =>
//     //       s.user_id.toString() ==
//     //         studentLPEnrollment.student.user.canvas_additional_info.canvas_id &&
//     //       assignmentPerLPMap.has(Number(s.assignment_id)),
//     //   );

//     //   samples.push(
//     //     ...(studentSubmitions.map((s) => {
//     //       const assignment = assignmentPerLPMap.get(Number(s.assignment_id));
//     //       const course = coursesMap.get(Number(assignment.course_id));
//     //       const subject = subjectMap.get(Number(course.id));

//     //       const status = !s.submitted_at
//     //         ? SampleStatus.MISSING_SAMPLE
//     //         : !s.grade || !assignment?.name
//     //           ? SampleStatus.ERRORS_FOUND
//     //           : SampleStatus.PENDING;

//     //       return {
//     //         assignment_title: assignment?.name,
//     //         grade: s.grade,
//     //         date: s.submitted_at ? new Date(s.submitted_at) : undefined,
//     //         status,
//     //         student_lp_enrollment: studentLPEnrollment,
//     //         subject,
//     //         preview_url: s.preview_url,
//     //       } as SampleEntity;
//     //     }) as SampleEntity[]),
//     //   );
//     // }

//     return res.length ? res : samples;
//   }

//   private async createSampleFlags(
//     queryRunner: QueryRunner,
//     samples: SampleEntity[],
//   ) {
//     const sample_flag_errors = samples.filter(
//       (sample) => sample.status == SampleStatus.ERRORS_FOUND,
//     );
//     const sample_flag_missing_work = samples.filter(
//       (sample) => sample.status == SampleStatus.MISSING_SAMPLE,
//     );

//     await queryRunner.manager.save(
//       SampleFlagErrorEntity,
//       sample_flag_errors.map(
//         (sample) =>
//           ({
//             sample,
//             comment: 'Grade is missing',
//           }) as SampleFlagErrorEntity,
//       ),
//       {
//         chunk: 1000,
//       },
//     );
//     await queryRunner.manager.save(
//       SampleFlagMissingWorkEntity,
//       sample_flag_missing_work.map(
//         (sample) =>
//           ({
//             sample,
//             reason: 'No submission',
//           }) as SampleFlagMissingWorkEntity,
//       ),
//       {
//         chunk: 1000,
//       },
//     );
//   }

//   private async createAdmin(queryRunner: QueryRunner, tenant: TenantEntity) {
//     const cheredia = await queryRunner.manager.findOne(UserEntity, {
//       where: { email: 'cheredia@eliteacademic.com' },
//     });
//     const admin = await queryRunner.manager.save(UserEntity, [
//       {
//         email: 'admin@test.com',
//         password: await argon2.hash('password'),
//         name: 'Admin',
//         isActive: true,
//         emailVerified: true,
//         role: RolesEnum.SUPER_ADMIN,
//       },
//       {
//         email: 'rgonzalez@eliteacademic.com',
//         password: await argon2.hash('password'),
//         name: 'Rachel Gonzalez',
//         isActive: true,
//         emailVerified: true,
//         role: RolesEnum.ADMIN,
//       },
//       {
//         ...cheredia,
//         role: RolesEnum.ADMIN,
//       },
//     ]);

//     await queryRunner.manager.save(
//       AdminEntity,
//       admin.map((user) => ({
//         user,
//         tenant,
//       })),
//     );
//   }

//   private async recalculateAssignmentPeriods(queryRunner: QueryRunner) {
//     await queryRunner.manager.query(
//       `
//         WITH assignment_stats AS (
//     SELECT
//       sle.id,
//       COUNT(s.id) as total_samples,
//       COUNT(CASE WHEN s.status = 'COMPLETED' THEN 1 END) as completed_samples,
//       CASE
//         WHEN COUNT(s.id) > 0 THEN
//           (COUNT(CASE WHEN s.status = 'COMPLETED' THEN 1 END)::decimal / COUNT(s.id)::decimal) * 100
//         ELSE 0
//       END as calculated_percentage,
//       CASE
//         WHEN COUNT(s.id) = 0 THEN false
//         WHEN COUNT(s.id) = COUNT(CASE WHEN s.status = 'COMPLETED' THEN 1 END) THEN true
//         ELSE false
//       END as is_completed
//     FROM student_lp_enrollments sle
//     LEFT JOIN student_lp_enrollments_samples_samples slss ON slss."studentLpEnrollmentsId" = sle.id
//     LEFT JOIN samples s ON s.id = slss."samplesId"
//     WHERE sle.completed = false
//     GROUP BY sle.id
//   )
//   UPDATE student_lp_enrollments
//   SET
//     percentage = assignment_stats.calculated_percentage,
//     completed = assignment_stats.is_completed,
//     "updatedAt" = NOW()
//   FROM assignment_stats
//   WHERE student_lp_enrollments.id = assignment_stats.id;
//       `,
//     );
//     // const assignment_periods = await queryRunner.manager.find(
//     //   StudentLPEnrollmentEntity,
//     //   {
//     //     where: {
//     //       completed: false,
//     //     },
//     //     relations: { samples: true },
//     //   },
//     // );
//     // for (const assignment_period of assignment_periods) {
//     //   assignment_period.percentage =
//     //     (assignment_period.samples.filter(
//     //       (sample) => sample.status == SampleStatus.COMPLETED,
//     //     ).length /
//     //       assignment_period.samples.length) *
//     //     100;
//     //   assignment_period.completed = assignment_period.samples.every(
//     //     (sample) => sample.status == SampleStatus.COMPLETED,
//     //   );
//     // }
//     // await queryRunner.manager.save(
//     //   StudentLPEnrollmentEntity,
//     //   assignment_periods,
//     //   {
//     //     chunk: 1000,
//     //   },
//     // );
//   }

//   private async deleteRedunantData(
//     queryRunner: QueryRunner,
//     samples: SampleEntity[],
//     subjects: SubjectEntity[],
//     track: TrackEntity,
//   ) {
//     const subjectIds = new Set(samples.map((s) => s.subject_id));
//     const subjectsToDelete = subjects.filter(
//       (s) => !subjectIds.has(s.id) && s.track_id == track.id,
//     );
//     if (subjectsToDelete.length === subjectIds.size) {
//       console.log('No subjects to delete');
//     } else {
//       const subjectIdsToDelete = subjectsToDelete.map((s) => s.id);
//       await queryRunner.manager.delete(SubjectEntity, subjectIdsToDelete);
//     }

//     const emptyStudentLPEnrollments = await queryRunner.manager
//       .getRepository(StudentLPEnrollmentEntity)
//       .createQueryBuilder('studentLPEnrollment')
//       .leftJoin('studentLPEnrollment.samples', 'sample')
//       .where('sample.id IS NULL')
//       .getMany();

//     if (emptyStudentLPEnrollments.length === 0) {
//       console.log('No empty student LP enrollments to delete');
//     } else {
//       await queryRunner.manager.delete(
//         StudentLPEnrollmentEntity,
//         emptyStudentLPEnrollments.map((e) => e.id),
//       );
//     }
//   }
// }
