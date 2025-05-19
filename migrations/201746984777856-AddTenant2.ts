// import * as argon2 from 'argon2';
// import { MigrationInterface, QueryRunner } from 'typeorm';

// import { CourseEntity } from '@/course/entities/course.entity';
// import {
//   AdminEntity,
//   DirectorEntity,
//   TeacherEntity,
// } from '@/staff/entities/staff.entity';
// import { SampleFlagMissingWorkEntity } from '@/students/entities/sample-flag.entity';
// import { SampleFlagErrorEntity } from '@/students/entities/sample-flag.entity';
// import { AcademicYearEntity } from '@/track/entities/academic-year.entity';
// import { SemesterEntity } from '@/track/entities/semester.entity';
// import { TrackCalendarEntity } from '@/track/entities/track-calendar.entity';
// import { RolesEnum } from '@/users/enums/roles.enum';

// import { AcademyEntity } from '../src/school/entities/academy.entity';
// import { AssignmentPeriodEntity } from '../src/school/entities/assignment.entity';
// import { SchoolEntity } from '../src/school/entities/school.entity';
// import {
//   SampleEntity,
//   SampleFlagCategory,
//   SampleStatus,
// } from '../src/students/entities/sample.entity';
// import { StudentEntity } from '../src/students/entities/student.entity';
// import { TenantEntity } from '../src/tenant/entities/tenant.entity';
// import { SubjectEntity } from '../src/track/entities/subject.entity';
// import { TrackEntity } from '../src/track/entities/track.entity';
// import { TrackLearningPeriodEntity } from '../src/track/entities/track-learning-period.entity';
// import { UserEntity } from '../src/users/entities/user.entity';

// export class AddTenant201746984777856 implements MigrationInterface {
//   private password: string;

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

//     // Create teachers and courses for all schools and academic years
//     const { global_courses } = await this.createTeachersAndCourses(
//       queryRunner,
//       schools,
//       academicYears,
//     );

//     for (const academicYear of academicYears) {
//       // Create tracks
//       const tracks = await this.createTracks(queryRunner, academicYear, tenant);

//       // Create semesters for these tracks
//       await this.createSemesters(queryRunner, tracks);

//       // Create students
//       const students = await this.createStudents(
//         queryRunner,
//         schools,
//         academies,
//         tracks,
//         academicYear,
//       );

//       for (let track_index = 0; track_index < tracks.length; track_index++) {
//         const track = tracks[track_index];

//         // Create learning periods
//         const learningPeriods = await this.createLearningPeriods(
//           queryRunner,
//           track,
//           academicYear,
//         );

//         // Create assignment periods
//         const assignmentPeriods = await this.createAssignmentPeriods(
//           queryRunner,
//           learningPeriods,
//           students,
//           global_courses,
//           track,
//           track_index,
//           academicYear,
//           tracks.length,
//         );

//         // Create subjects
//         const subjects = await this.createSubjects(queryRunner, track);

//         // Create samples for students
//         // Create sample flags
//         await this.createSampleFlags(
//           queryRunner,
//           await this.createSamples(queryRunner, assignmentPeriods, subjects),
//         );
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
//       'TRUNCATE TABLE "courses" RESTART IDENTITY CASCADE',
//     );
//     await queryRunner.manager.query(
//       'TRUNCATE TABLE "assignment_periods" RESTART IDENTITY CASCADE',
//     );
//   }

//   private createTenant(queryRunner: QueryRunner): Promise<TenantEntity> {
//     return queryRunner.manager.save(TenantEntity, {
//       name: 'Demo with Colin Canvas',
//     });
//   }

//   private createSchool(
//     queryRunner: QueryRunner,
//     tenant: TenantEntity,
//   ): Promise<SchoolEntity[]> {
//     return queryRunner.manager.save(SchoolEntity, [
//       { name: 'Demo School', tenant } as SchoolEntity,
//     ]);
//   }

//   private createAcademy(
//     queryRunner: QueryRunner,
//     tenant: TenantEntity,
//   ): Promise<AcademyEntity[]> {
//     return queryRunner.manager.save(AcademyEntity, [
//       { name: 'Homeschool', tenant },
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
//             email: `director_demo@test.com`,
//             password: this.password,
//             firstname: 'Director',
//             lastname: academy.name,
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
//     const currentYear = new Date().getFullYear();
//     return queryRunner.manager.save(AcademicYearEntity, [
//       { from: currentYear - 1, to: currentYear },
//       { from: currentYear, to: currentYear + 1 },
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

//   private async createTeachersAndCourses(
//     queryRunner: QueryRunner,
//     schools: SchoolEntity[],
//     academicYears: AcademicYearEntity[],
//   ) {
//     const global_teachers = [] as TeacherEntity[];
//     let global_courses = [] as CourseEntity[];

//     for (const school of schools) {
//       const teacher_users = await queryRunner.manager.save(
//         UserEntity,
//         Array.from(
//           { length: 15 },
//           (_, i) =>
//             ({
//               firstname: `Teacher ${i}`,
//               lastname: `${school.name}`,
//               email: `teacher${i + global_teachers.length}@test.com`,
//               password: this.password,
//               isActive: true,
//               emailVerified: true,
//               role: RolesEnum.TEACHER,
//             }) as UserEntity,
//         ),
//       );

//       const teachers = await queryRunner.manager.save(
//         TeacherEntity,
//         Array.from(
//           { length: 15 },
//           (_, i) =>
//             ({
//               user: teacher_users[i],
//             }) as TeacherEntity,
//         ),
//       );

//       for (const academicYear of academicYears) {
//         for (const teacher of teachers) {
//           global_courses.push({
//             school_id: school.id,
//             teacher_id: teacher.id,
//             academic_year: academicYear,
//           } as CourseEntity);
//         }
//       }
//       global_teachers.push(...teachers);
//     }

//     global_courses = (await queryRunner.manager.save(
//       CourseEntity,
//       global_courses,
//     )) as CourseEntity[];

//     return { global_teachers, global_courses };
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
//         academic_year_id: academicYear.id,
//       } as TrackEntity,
//       {
//         name: `Track B`,
//         tenant,
//         start_date: new Date(academicYear.from, 8, 27),
//         end_date: new Date(academicYear.to, 6, 10),
//         academic_year_id: academicYear.id,
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
//     const subjects = [] as SubjectEntity[];
//     subjects.push(
//       ...Array.from(
//         { length: 2 },
//         (_, i) =>
//           ({
//             name: `Subject ${i + 1} for ${track.name}`,
//             track,
//           }) as SubjectEntity,
//       ),
//     );
//     return queryRunner.manager.save(SubjectEntity, subjects);
//   }

//   private async createStudents(
//     queryRunner: QueryRunner,
//     schools: SchoolEntity[],
//     academies: AcademyEntity[],
//     tracks: TrackEntity[],
//     academicYear: AcademicYearEntity,
//   ) {
//     const students = [] as StudentEntity[];
//     for (const school of schools) {
//       const users = await queryRunner.manager.save(
//         UserEntity,
//         Array.from(
//           { length: 30 },
//           (_, i) =>
//             ({
//               email: `user${i}_${school.name.replace(' ', '_')}_${academicYear.from}_${academicYear.to}@test.com`,
//               password: this.password,
//               firstname: `User${i}`,
//               lastname: `Test`,
//               isActive: true,
//               emailVerified: true,
//               role: RolesEnum.STUDENT,
//             }) as UserEntity,
//         ),
//       );

//       const logcal = await queryRunner.manager.save(
//         StudentEntity,
//         users.map(
//           (user, i) =>
//             ({
//               user,
//               school_id: school.id,
//               academy_id: academies[i % academies.length].id,
//               track_id: tracks[i % tracks.length].id,
//               grade: `Grade ${(i % 12) + 1}`,
//             }) as StudentEntity,
//         ),
//       );
//       students.push(...logcal);
//     }
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

//   private async createAssignmentPeriods(
//     queryRunner: QueryRunner,
//     learningPeriods: TrackLearningPeriodEntity[],
//     students: StudentEntity[],
//     courses: CourseEntity[],
//     track: TrackEntity,
//     track_index: number,
//     academicYear: AcademicYearEntity,
//     length: number,
//   ) {
//     const filtered_courses = courses.filter(
//       (as, index) =>
//         index % length == track_index && as.academic_year_id == academicYear.id,
//     );

//     const assignmentPeriods = [];

//     for (const course of filtered_courses) {
//       const local_assignmentPeriods = [];
//       const filteredStudents = students.filter(
//         (student) =>
//           student.track_id == track.id && student.school_id == course.school_id,
//       );
//       for (const student of filteredStudents) {
//         for (const learningPeriod of learningPeriods) {
//           const completed = Math.random() > 0.3;
//           local_assignmentPeriods.push({
//             course,
//             student,
//             learning_period: learningPeriod,
//             completed,
//             percentage: completed ? 100 : 0,
//           } as AssignmentPeriodEntity);
//         }
//       }
//       assignmentPeriods.push(
//         ...(await queryRunner.manager.save(
//           AssignmentPeriodEntity,
//           local_assignmentPeriods,
//         )),
//       );
//     }
//     return assignmentPeriods;
//   }

//   private async createSamples(
//     queryRunner: QueryRunner,
//     assignmentPeriods: AssignmentPeriodEntity[],
//     subjects: SubjectEntity[],
//   ) {
//     const samples: SampleEntity[] = [];
//     for (const assignmentPeriod of assignmentPeriods) {
//       for (const subject of subjects) {
//         const isCompleted = Math.random() > 0.7 || assignmentPeriod.completed;
//         const user_id = isCompleted ? assignmentPeriod.course.teacher_id : null;

//         const status = isCompleted
//           ? SampleStatus.COMPLETED
//           : Math.random() > 0.5
//             ? SampleStatus.ERRORS_FOUND
//             : Math.random() > 0.5
//               ? SampleStatus.MISSING_SAMPLE
//               : SampleStatus.PENDING;

//         const flag_category =
//           status == SampleStatus.ERRORS_FOUND
//             ? SampleFlagCategory.ERROR_IN_SAMPLE
//             : null;

//         samples.push(
//           ...([
//             {
//               assignment_title: `Sample`,
//               status: assignmentPeriod.completed ? 'COMPLETED' : 'PENDING',
//               assignment_period_id: assignmentPeriod.id,
//               done_by_id: assignmentPeriod.completed ? user_id : null,
//               subject_id: subject.id,
//               flag_category,
//             },
//             {
//               assignment_title: `Sample 2`,
//               status,
//               assignment_period_id: assignmentPeriod.id,
//               done_by_id: user_id,
//               subject_id: subject.id,
//               flag_category,
//             },
//           ] as SampleEntity[]),
//         );
//       }
//     }
//     return await queryRunner.manager.save(SampleEntity, samples, {
//       chunk: 1000,
//     });
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
//             comment: `Comment ${Math.random()}`,
//           }) as SampleFlagErrorEntity,
//       ),
//     );
//     await queryRunner.manager.save(
//       SampleFlagMissingWorkEntity,
//       sample_flag_missing_work.map(
//         (sample) =>
//           ({
//             sample,
//             reason: `Reason ${Math.random()}`,
//           }) as SampleFlagMissingWorkEntity,
//       ),
//     );
//   }

//   private async createAdmin(queryRunner: QueryRunner, tenant: TenantEntity) {
//     const admin = await queryRunner.manager.save(UserEntity, [
//       {
//         email: 'admin@test.com',
//         password: await argon2.hash('password'),
//         firstname: 'Admin',
//         lastname: 'Admin',
//         isActive: true,
//         emailVerified: true,
//         role: RolesEnum.SUPER_ADMIN,
//       },
//       {
//         email: 'ecap.colin@gmail.com',
//         password: await argon2.hash('password'),
//         firstname: 'Colin',
//         lastname: 'Cooper',
//         isActive: true,
//         emailVerified: true,
//         role: RolesEnum.SUPER_ADMIN,
//       },
//     ]);

//     await queryRunner.manager.save(AdminEntity, [
//       {
//         user: admin[0],
//         tenant,
//       },
//       {
//         user: admin[1],
//         tenant,
//       },
//     ]);
//   }

//   private async recalculateAssignmentPeriods(queryRunner: QueryRunner) {
//     const assignment_periods = await queryRunner.manager.find(
//       AssignmentPeriodEntity,
//       {
//         where: {
//           completed: false,
//         },
//         relations: { samples: true },
//       },
//     );
//     for (const assignment_period of assignment_periods) {
//       assignment_period.percentage =
//         (assignment_period.samples.filter(
//           (sample) => sample.status == SampleStatus.COMPLETED,
//         ).length /
//           assignment_period.samples.length) *
//         100;
//     }
//     await queryRunner.manager.save(AssignmentPeriodEntity, assignment_periods);
//   }
// }
