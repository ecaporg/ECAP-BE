// /* eslint-disable @typescript-eslint/no-unused-vars */
// import * as argon2 from 'argon2';
// import { readFileSync } from 'fs';
// import { Assignment } from 'migrations/elite-data/assignments';
// import { Course } from 'migrations/elite-data/courses';
// import { People } from 'migrations/elite-data/peoples';
// import { Submission } from 'migrations/elite-data/submitions';
// import { StudentLPEnrollmentEntity } from 'src/domain/enrollment/entities/student-enrollment.entity';
// import { StudentLPEnrollmentAssignmentEntity } from 'src/domain/enrollment/entities/student-enrollment-assignment.entity';
// import { TeacherSchoolYearEnrollmentEntity } from 'src/domain/enrollment/entities/teacher-enrollment.entity';
// import { AcademyEntity } from 'src/domain/school/entities/academy.entity';
// import { SchoolEntity } from 'src/domain/school/entities/school.entity';
// import {
//   AdminEntity,
//   DirectorEntity,
//   TeacherEntity,
// } from 'src/domain/staff/entities/staff.entity';
// import {
//   SampleEntity,
//   SampleStatus,
// } from 'src/domain/students/entities/sample.entity';
// import {
//   SampleFlagErrorEntity,
//   SampleFlagMissingWorkEntity,
// } from 'src/domain/students/entities/sample-flag.entity';
// import { StudentEntity } from 'src/domain/students/entities/student.entity';
// import { CourseEntity } from 'src/domain/subject/entities/course.entity';
// import { KeyEntity } from 'src/domain/tenant/entities/key.entity';
// import { TenantEntity } from 'src/domain/tenant/entities/tenant.entity';
// import { AcademicYearEntity } from 'src/domain/track/entities/academic-year.entity';
// import { SemesterEntity } from 'src/domain/track/entities/semester.entity';
// import { TrackEntity } from 'src/domain/track/entities/track.entity';
// import { TrackCalendarEntity } from 'src/domain/track/entities/track-calendar.entity';
// import { TrackLearningPeriodEntity } from 'src/domain/track/entities/track-learning-period.entity';
// import { UserEntity } from 'src/domain/users/entities/user.entity';
// import { RolesEnum } from 'src/domain/users/enums/roles.enum';
// import { MigrationInterface, QueryRunner } from 'typeorm';

// const schoolToScope = {
//   'Mountain Empire': 'mountainelite',
//   Lucerne: 'lucerne',
// };

// export class Elite20261757021698364 implements MigrationInterface {
//   private password: string;
//   public name = 'Elite20261757021698364';

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

//     // Create subjects for each track, create courses and assignments in canvas
//     const canvasCoursesWithAssignments =
//       await this.createCanvasCoursesWithAssignments(queryRunner, tenant);

//     for (const academicYear of academicYears) {
//       // Create tracks
//       const tracks = await this.createTracks(queryRunner, academicYear, tenant);

//       // Create semesters for these tracks
//       await this.createSemesters(queryRunner, tracks);

//       for (const track of tracks) {
//         // Create learning periods
//         const learningPeriods = await this.createLearningPeriods(
//           queryRunner,
//           track,
//           academicYear,
//         );

//         // Create student LP enrollments, and assignments for each enrollment, including submissions
//         const studentLPEnrollments = await this.createStudentLPEnrollments(
//           queryRunner,
//           learningPeriods,
//           students,
//           enrollments,
//           track,
//           academicYear,
//           canvasCoursesWithAssignments,
//         );

//         // await this.deleteRedunantData(queryRunner, samples, subjects, track);
//       }
//     }

//     // Create admin user
//     await this.createAdmin(queryRunner, tenant);

//     await this.addAdminIdToComplatedSemples(queryRunner);

//     await this.recalculateAssignmentPeriods(queryRunner);
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     // truncate all tables and reset sequences

//     await queryRunner.query(`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE`);
//     await queryRunner.query(
//       `TRUNCATE TABLE "directors" RESTART IDENTITY CASCADE`,
//     );
//     await queryRunner.query(`TRUNCATE TABLE "admins" RESTART IDENTITY CASCADE`);
//     await queryRunner.query(
//       `TRUNCATE TABLE "teachers" RESTART IDENTITY CASCADE`,
//     );
//     await queryRunner.query(
//       `TRUNCATE TABLE "teacher_school_year_enrollments" RESTART IDENTITY CASCADE`,
//     );
//     await queryRunner.query(
//       `TRUNCATE TABLE "student_lp_enrollments" RESTART IDENTITY CASCADE`,
//     );
//     await queryRunner.query(
//       `TRUNCATE TABLE "students" RESTART IDENTITY CASCADE`,
//     );
//     await queryRunner.query(
//       `TRUNCATE TABLE "academies" RESTART IDENTITY CASCADE`,
//     );
//     await queryRunner.query(
//       `TRUNCATE TABLE "tenants" RESTART IDENTITY CASCADE`,
//     );
//     await queryRunner.query(`TRUNCATE TABLE "keys" RESTART IDENTITY CASCADE`);
//     await queryRunner.query(`TRUNCATE TABLE "errors" RESTART IDENTITY CASCADE`);
//     await queryRunner.query(`TRUNCATE TABLE "tracks" RESTART IDENTITY CASCADE`);
//     await queryRunner.query(
//       `TRUNCATE TABLE "track_learning_periods" RESTART IDENTITY CASCADE`,
//     );
//     await queryRunner.query(
//       `TRUNCATE TABLE "track_calendar" RESTART IDENTITY CASCADE`,
//     );
//     await queryRunner.query(
//       `TRUNCATE TABLE "semesters" RESTART IDENTITY CASCADE`,
//     );
//     await queryRunner.query(
//       `TRUNCATE TABLE "academic_years" RESTART IDENTITY CASCADE`,
//     );
//     await queryRunner.query(
//       `TRUNCATE TABLE "samples" RESTART IDENTITY CASCADE`,
//     );
//     await queryRunner.query(
//       `TRUNCATE TABLE "sample_flag_rejected" RESTART IDENTITY CASCADE`,
//     );
//     await queryRunner.query(
//       `TRUNCATE TABLE "sample_flag_completed" RESTART IDENTITY CASCADE`,
//     );
//     await queryRunner.query(
//       `TRUNCATE TABLE "sample_flag_missing_work" RESTART IDENTITY CASCADE`,
//     );
//     await queryRunner.query(
//       `TRUNCATE TABLE "sample_flag_errors" RESTART IDENTITY CASCADE`,
//     );
//     await queryRunner.query(
//       `TRUNCATE TABLE "student_lp_enrollment_assignments" RESTART IDENTITY CASCADE`,
//     );
//     await queryRunner.query(
//       `TRUNCATE TABLE "assignments" RESTART IDENTITY CASCADE`,
//     );
//     await queryRunner.query(
//       `TRUNCATE TABLE "courses" RESTART IDENTITY CASCADE`,
//     );
//     await queryRunner.query(
//       `TRUNCATE TABLE "schools" RESTART IDENTITY CASCADE`,
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
//     const directorsData = JSON.parse(
//       readFileSync('migrations/elite-data/directors.json', 'utf8'),
//     ) as People[];

//     const director_users = await queryRunner.manager.save(
//       UserEntity,
//       directorsData.map(
//         (director, idx) =>
//           ({
//             email: director.email,
//             password: this.password,
//             name: director.name,
//             isActive: true,
//             emailVerified: true,
//             role: RolesEnum.DIRECTOR,
//             canvas_additional_info: {
//               canvas_id: director.id,
//               sis_user_id: director.sis_user_id,
//               sis_import_id: director.sis_import_id,
//               avatar_url: director.avatar_url,
//               time_zone: director.time_zone,
//             } as Record<string, any>,
//           }) as UserEntity,
//       ),
//     );
//     const directors = await queryRunner.manager.save(
//       DirectorEntity,
//       director_users.map(
//         (user) =>
//           ({
//             id: user.id,
//             academy: academies[0], // all directors assigned to first academy by default
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
//       { from: 2025, to: 2026 },
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

//     const peopleMap = new Map(peoples.map((p) => [p.id.toString(), p]));

//     for (const academicYear of academicYears) {
//       for (const teacher of teachers) {
//         const person = peopleMap.get(
//           teacher.user.canvas_additional_info.canvas_id,
//         );

//         for (const school of schools) {
//           enrollments.push({
//             school,
//             teacher,
//             academic_year: academicYear,
//           } as TeacherSchoolYearEnrollmentEntity);

//           if (
//             person?.sis &&
//             schoolToScope[school.name] == person.sis.scope_title
//           )
//             break;
//         }
//       }
//     }

//     await queryRunner.manager.save(
//       TeacherSchoolYearEnrollmentEntity,
//       enrollments,
//     );

//     return { enrollments };
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
//         start_date: new Date(academicYear.from, 6, 1),
//         end_date: new Date(academicYear.to, 5, 11),
//         academicYear,
//       } as TrackEntity,
//       {
//         name: `Track B`,
//         tenant,
//         start_date: new Date(academicYear.from, 7, 27),
//         end_date: new Date(academicYear.to, 5, 11),
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
//       { chunk: 1000 },
//     );

//     const students = await queryRunner.manager.save(
//       StudentEntity,
//       users.map((user) => {
//         const person = peoples.find(
//           (p) => p.id == user.canvas_additional_info.canvas_id,
//         );

//         const school = schools.find(
//           (s) => s.name == (!!person?.sis ? 'Mountain Empire' : 'Lucerne'),
//         );

//         const academy =
//           academies.find(
//             (a) =>
//               person?.sis?.lc_name?.includes(a.name.toLowerCase()) ||
//               person?.sis?.lc_name?.toLowerCase() === a.name.toLowerCase(),
//           ) || academies[0];

//         return {
//           user,
//           academy_id: academy?.id,
//           school_id: school?.id,
//         } as StudentEntity;
//       }),
//       { chunk: 1000 },
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
//           end_date: new Date(academicYear.from, 7, 2),
//         },
//         {
//           name: `LP2`,
//           track,
//           start_date: new Date(academicYear.from, 7, 4),
//           end_date: new Date(academicYear.from, 7, 26),
//         },
//         {
//           name: `LP3`,
//           track,
//           start_date: new Date(academicYear.from, 7, 27),
//           end_date: new Date(academicYear.from, 9, 3),
//         },
//         {
//           name: `LP4`,
//           track,
//           start_date: new Date(academicYear.from, 9, 6),
//           end_date: new Date(academicYear.from, 10, 21),
//         },
//         {
//           name: `LP5`,
//           track,
//           start_date: new Date(academicYear.from, 11, 1),
//           end_date: new Date(academicYear.to, 0, 16),
//         },
//         {
//           name: `LP6`,
//           track,
//           start_date: new Date(academicYear.to, 0, 21),
//           end_date: new Date(academicYear.to, 1, 12),
//         },
//         {
//           name: `LP7`,
//           track,
//           start_date: new Date(academicYear.to, 1, 17),
//           end_date: new Date(academicYear.to, 2, 20),
//         },
//         {
//           name: `LP8`,
//           track,
//           start_date: new Date(academicYear.to, 2, 23),
//           end_date: new Date(academicYear.to, 4, 2),
//         },
//         {
//           name: `LP9`,
//           track,
//           start_date: new Date(academicYear.to, 4, 4),
//           end_date: new Date(academicYear.to, 5, 11),
//         },
//       ] as TrackLearningPeriodEntity[];
//     } else {
//       learningPeriods = [
//         {
//           name: `LP1`,
//           track,
//           start_date: new Date(academicYear.from, 7, 27),
//           end_date: new Date(academicYear.from, 9, 3),
//         },
//         {
//           name: `LP2`,
//           track,
//           start_date: new Date(academicYear.from, 9, 6),
//           end_date: new Date(academicYear.from, 10, 21),
//         },
//         {
//           name: `LP3`,
//           track,
//           start_date: new Date(academicYear.from, 11, 1),
//           end_date: new Date(academicYear.to, 0, 16),
//         },
//         {
//           name: `LP4`,
//           track,
//           start_date: new Date(academicYear.to, 0, 21),
//           end_date: new Date(academicYear.to, 1, 12),
//         },
//         {
//           name: `LP5`,
//           track,
//           start_date: new Date(academicYear.to, 1, 17),
//           end_date: new Date(academicYear.to, 2, 20),
//         },
//         {
//           name: `LP6`,
//           track,
//           start_date: new Date(academicYear.to, 2, 23),
//           end_date: new Date(academicYear.to, 4, 2),
//         },
//         {
//           name: `LP7`,
//           track,
//           start_date: new Date(academicYear.to, 4, 4),
//           end_date: new Date(academicYear.to, 5, 11),
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
//     canvasCoursesWithAssignments: CourseEntity[],
//   ) {
//     const teacher_school_enrollment = enrollments.filter(
//       (as) => as.academic_year_id == academicYear.id,
//     );

//     const courses = JSON.parse(
//       readFileSync('migrations/elite-data/courses-filtered.json', 'utf8'),
//     ) as Course[];

//     const assignments = JSON.parse(
//       readFileSync('migrations/elite-data/assignments-filtered.json', 'utf8'),
//     ) as Assignment[];

//     const work_samples = new Map<string, Submission[]>(
//       (
//         JSON.parse(
//           readFileSync('migrations/elite-data/submissions.json', 'utf8'),
//         ) as Submission[][]
//       )
//         .filter((arr) => arr.length > 0)
//         .map((arr) => [arr[0].assignment_id.toString(), arr]),
//     );

//     const filtered_students = students.filter(
//       (student) =>
//         student.school_id &&
//         student.user.canvas_additional_info.track_name == track.name,
//     );

//     const studentLPEnrollmentPeriods: StudentLPEnrollmentEntity[] = [];

//     for (const student of filtered_students) {
//       const filtered_courses = courses.filter((course) =>
//         course.all_users.find(
//           (t) => t.id == student.user.canvas_additional_info.canvas_id,
//         ),
//       );

//       const filtered_assignments = assignments.filter((assignment) =>
//         filtered_courses.find((course) => course.id == assignment.course_id),
//       );

//       for (const learningPeriod of learningPeriods) {
//         const assignmentsInLP = filtered_assignments.filter((assignment) => {
//           const assignmentStartDate = new Date(
//             assignment.learning_period.start_date,
//           );
//           const assignmentEndDate = new Date(
//             assignment.learning_period.end_date,
//           );
//           const lpStartDate = new Date(learningPeriod.start_date);
//           const lpEndDate = new Date(learningPeriod.end_date);

//           return (
//             assignmentStartDate.toDateString() == lpStartDate.toDateString() &&
//             assignmentEndDate.toDateString() == lpEndDate.toDateString()
//           );
//         });

//         const teacher_ids = new Set(
//           filtered_courses
//             .filter((course) =>
//               assignmentsInLP.find(
//                 (assignment) => assignment.course_id == course.id,
//               ),
//             )
//             .flatMap((course) => course.teachers.map(({ id }) => id)),
//         );

//         if (teacher_ids.size == 0) continue;

//         const assignments: StudentLPEnrollmentAssignmentEntity[] =
//           this.getStudentLPEnrollmentAssignment(
//             canvasCoursesWithAssignments,
//             assignmentsInLP,
//             work_samples,
//             student,
//           );

//         studentLPEnrollmentPeriods.push({
//           student,
//           learning_period: learningPeriod,
//           completed: false,
//           percentage: 0,
//           student_grade: `Grade ${student.user.canvas_additional_info.grade}`,
//           teacher_school_year_enrollments: teacher_school_enrollment.filter(
//             (enrollment) =>
//               enrollment.school_id == student.school_id &&
//               teacher_ids.has(
//                 enrollment.teacher.user.canvas_additional_info.canvas_id,
//               ),
//           ),
//           assignments,
//         } as StudentLPEnrollmentEntity);
//       }
//     }

//     return queryRunner.manager.save(
//       StudentLPEnrollmentEntity,
//       studentLPEnrollmentPeriods,
//       { chunk: 600 },
//     );
//   }

//   private async createCanvasCoursesWithAssignments(
//     queryRunner: QueryRunner,
//     tenant: TenantEntity,
//   ) {
//     const assignmentsMap: Assignment[] = JSON.parse(
//       readFileSync('migrations/elite-data/assignments-filtered.json', 'utf8'),
//     );

//     const coursesMap: Course[] = JSON.parse(
//       readFileSync('migrations/elite-data/courses-filtered.json', 'utf8'),
//     );

//     const courses: CourseEntity[] = [];
//     for (const course of coursesMap) {
//       const courseAssignments = assignmentsMap
//         .filter((assignment) => assignment.course_id == course.id)
//         .map(
//           (assignment) =>
//             ({
//               name: assignment.name,
//               canvas_id: assignment.id,
//               due_at: new Date(assignment.due_at),
//             }) as CourseEntity['assignments'][number],
//         );

//       courses.push({
//         canvas_id: course.id,
//         name: course.name,
//         assignments: courseAssignments,
//         tenant,
//       } as CourseEntity);
//     }

//     return queryRunner.manager.save(CourseEntity, courses, {
//       chunk: 600,
//     });
//   }

//   private getStudentLPEnrollmentAssignment(
//     courseEntities: CourseEntity[],
//     assignmentsInLP: Assignment[],
//     submissions: Map<string, Submission[]>,
//     student: StudentEntity,
//   ) {
//     const filteredCourses = courseEntities.filter((course) =>
//       assignmentsInLP.find((assignment) =>
//         course.assignments.find((a) => a.canvas_id == assignment.id),
//       ),
//     );

//     return filteredCourses
//       .flatMap((course) => course.assignments)
//       .filter((assignment) =>
//         assignmentsInLP.find((a) => a.id == assignment.canvas_id),
//       )
//       .map((assignment) => {
//         const submission = submissions
//           .get(assignment.canvas_id.toString())
//           ?.find(
//             (s) =>
//               s.user_id.toString() ==
//               student.user.canvas_additional_info.canvas_id,
//           );

//         const subject = filteredCourses.find((course) =>
//           course.assignments.find((a) => a.canvas_id == assignment.canvas_id),
//         );

//         if (!subject) return null;

//         return {
//           assignment,
//           sample: this.createSamples(submission),
//         } as StudentLPEnrollmentAssignmentEntity;
//       })
//       .filter(Boolean);
//   }

//   private createSamples(s?: Submission): SampleEntity {
//     const status =
//       !s || s?.missing || s?.workflow_state === 'unsubmitted'
//         ? SampleStatus.MISSING_SAMPLE
//         : !s.grade
//           ? SampleStatus.ERRORS_FOUND
//           : s.workflow_state === 'graded'
//             ? SampleStatus.COMPLETED
//             : SampleStatus.PENDING;

//     const sample = {
//       grade: s?.grade,
//       date: s?.submitted_at ? new Date(s.submitted_at) : undefined,
//       status,
//       preview_url: s?.preview_url,
//       done_by_id: undefined,
//       canvas_id: s?.id,
//     } as SampleEntity;

//     this.createSampleFlags(sample);

//     return sample;
//   }

//   private async createSampleFlags(samples: SampleEntity) {
//     if (samples.status === SampleStatus.ERRORS_FOUND) {
//       samples.flag_errors = {
//         comment: 'Errors found in work sample',
//       } as SampleFlagErrorEntity;
//     } else if (samples.status === SampleStatus.MISSING_SAMPLE) {
//       samples.flag_missing_work = {
//         reason: 'Missing work',
//       } as SampleFlagMissingWorkEntity;
//     }
//     return samples;
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
//       COUNT(slea.student_lp_enrollment_id) as total_assignments,
//       COUNT(CASE WHEN s.status = 'COMPLETED' THEN 1 END) as completed_assignments,
//       CASE
//         WHEN COUNT(slea.student_lp_enrollment_id) > 0 THEN
//           (COUNT(CASE WHEN s.status = 'COMPLETED' THEN 1 END)::decimal / COUNT(slea.student_lp_enrollment_id)::decimal) * 100
//         ELSE 0
//       END as calculated_percentage,
//       CASE
//         WHEN COUNT(slea.student_lp_enrollment_id) = 0 THEN false
//         WHEN COUNT(slea.student_lp_enrollment_id) = COUNT(CASE WHEN s.status = 'COMPLETED' THEN 1 END) THEN true
//         ELSE false
//       END as is_completed
//     FROM student_lp_enrollments sle
//     LEFT JOIN student_lp_enrollment_assignments slea ON slea.student_lp_enrollment_id = sle.id
//     LEFT JOIN samples s ON s.id = slea.sample_id
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
//   }

//   private async addAdminIdToComplatedSemples(queryRunner: QueryRunner) {
//     queryRunner.manager.query(`
//       UPDATE samples
//       SET done_by_id = a.id
//       FROM admins AS a
//       JOIN users AS u ON a.id = u.id
//       WHERE samples.status = 'COMPLETED'
//       AND samples.done_by_id IS NULL
//       AND u.email = 'cheredia@eliteacademic.com'
//     `);
//   }

//   private async deleteRedunantData(
//     queryRunner: QueryRunner,
//     samples: SampleEntity[],
//     track: TrackEntity,
//   ) {
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
