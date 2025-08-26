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
// import { In, MigrationInterface, QueryRunner } from 'typeorm';

// export class AddEliteData2025210000000000 implements MigrationInterface {
//   public name = 'AddEliteData2025210000000000';

//   public async up(queryRunner: QueryRunner): Promise<void> {
//     const tenant = await this.getTenant(queryRunner);

//     const schools = await this.getSchools(queryRunner, tenant);

//     const academies = await this.getAcademies(queryRunner, tenant);

//     const academicYears = await this.createAcademicYears(queryRunner);

//     // Create teachers and enrollments for all schools and academic years
//     const { enrollments } = await this.createTeachersAndEnrollments(
//       queryRunner,
//       schools,
//       academicYears,
//     );

//     // Create students
//     // const students = await this.createStudents(queryRunner, schools, academies);

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

//         const subjects = await this.createSubjects(queryRunner, track);
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

//   private async getTenant(queryRunner: QueryRunner): Promise<TenantEntity> {
//     const tenant = await queryRunner.manager.findOne(TenantEntity, {
//       where: { name: 'Elite', key: { url: 'https://eliteaa.instructure.com' } },
//     });
//     if (!tenant) {
//       throw new Error('Tenant not found');
//     }
//     return tenant;
//   }

//   private getSchools(
//     queryRunner: QueryRunner,
//     tenant: TenantEntity,
//   ): Promise<SchoolEntity[]> {
//     return queryRunner.manager.find(SchoolEntity, {
//       where: { tenant },
//     });
//   }

//   private getAcademies(
//     queryRunner: QueryRunner,
//     tenant: TenantEntity,
//   ): Promise<AcademyEntity[]> {
//     return queryRunner.manager.find(AcademyEntity, {
//       where: { tenant },
//     });
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
//     const prev_enrollments = await queryRunner.manager.find(
//       TeacherSchoolYearEnrollmentEntity,
//       {
//         where: {
//           school: In(schools),
//           academic_year: {
//             from: 2024,
//             to: 2025,
//           },
//         },
//         relations: {
//           academic_year: true,
//           school: true,
//           teacher: { user: true },
//         },
//       },
//     );

//     for (const enrollment of prev_enrollments) {
//       for (const academicYear of academicYears) {
//         enrollments.push({
//           school: enrollment.school,
//           teacher: enrollment.teacher,
//           academic_year: academicYear,
//         } as TeacherSchoolYearEnrollmentEntity);
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
// }
