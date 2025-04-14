// import * as argon2 from 'argon2';
// import { MigrationInterface, QueryRunner } from 'typeorm';

// import { RolesEnum } from '@/users/enums/roles.enum';

// import { AcademicYearEntity } from '../src/school/entities/academic-year.entity';
// import { AcademyEntity } from '../src/school/entities/academy.entity';
// import { SchoolEntity } from '../src/school/entities/school.entity';
// import { SubjectAssignmentEntity } from '../src/school/entities/subject-assignment.entity';
// import { SubjectAssignmentLearningPeriodEntity } from '../src/school/entities/subject-assignment.entity';
// import { TenantEntity } from '../src/school/entities/tenant.entity';
// import { DirectorEntity } from '../src/staff/entities/director.entity';
// import { TeacherEntity } from '../src/staff/entities/staff.entity';
// import { SampleEntity } from '../src/students/entities/sample.entity';
// import { StudentEntity } from '../src/students/entities/student.entity';
// import { SubjectEntity } from '../src/track/entities/subject.entity';
// import { TrackEntity } from '../src/track/entities/track.entity';
// import { TrackLearningPeriodEntity } from '../src/track/entities/track-learning-period.entity';
// import { UserEntity } from '../src/users/entities/user.entity';

// export class AddTestData1744271139400 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     // Create a tenant
//     const tenant = await queryRunner.manager.save(TenantEntity, {
//       name: 'Test Tenant',
//     });

//     // Create schools
//     const schools = await queryRunner.manager.save(SchoolEntity, [
//       { name: 'School 1', tenant },
//       { name: 'School 2', tenant },
//       { name: 'School 3', tenant },
//       { name: 'School 4', tenant },
//       { name: 'School 5', tenant },
//     ]);

//     // Create academies
//     const academies = await queryRunner.manager.save(AcademyEntity, [
//       { name: 'Home', tenant },
//       { name: 'Offline', tenant },
//       { name: 'Flex', tenant },
//       { name: 'Online', tenant },
//       { name: 'Hybrid', tenant },
//     ]);

//     // Create academic years (including historical data)
//     const currentYear = new Date().getFullYear();
//     const academicYears = await queryRunner.manager.save(AcademicYearEntity, [
//       { from: currentYear - 2, to: currentYear - 1 },
//       { from: currentYear - 1, to: currentYear },
//       { from: currentYear, to: currentYear + 1 },
//     ]);

//     // Create 100 random users (more for pagination testing)
//     const users = [];
//     for (let i = 0; i < 100; i++) {
//       const user = await queryRunner.manager.save(UserEntity, {
//         email: `user${i}@test.com`,
//         password: await argon2.hash('password'),
//         firstname: `User${i}`,
//         lastname: `Test`,
//         isActive: true,
//         emailVerified: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         role:
//           i === 0
//             ? RolesEnum.SUPER_ADMIN
//             : i < 5
//               ? RolesEnum.ADMIN
//               : i < 20
//                 ? RolesEnum.TEACHER
//                 : i < 25
//                   ? RolesEnum.DIRECTOR
//                   : RolesEnum.STUDENT,
//       });
//       users.push(user);
//     }

//     // Assign directors
//     for (let i = 0; i < 5; i++) {
//       await queryRunner.manager.save(DirectorEntity, {
//         user: users[i + 20], // Using users 20-24 for directors
//         school: schools[i % schools.length],
//         academy: academies[i % academies.length],
//       });
//     }

//     // Assign teachers
//     for (let i = 0; i < 15; i++) {
//       await queryRunner.manager.save(TeacherEntity, {
//         user: users[i + 5], // Using users 5-19 for teachers
//         school: schools[i % schools.length],
//       });
//     }

//     // Assign students
//     for (let i = 0; i < 75; i++) {
//       await queryRunner.manager.save(StudentEntity, {
//         user: users[i + 25], // Using users 25-99 for students
//         school: schools[i % schools.length],
//         academy: academies[i % academies.length],
//         grade: `Grade ${(i % 12) + 1}`,
//       });
//     }

//     // Create tracks
//     const tracks = await queryRunner.manager.save(TrackEntity, [
//       {
//         name: 'Track A',
//         tenant: tenant,
//         start_date: new Date(),
//         end_date: new Date(),
//       },
//       {
//         name: 'Track B',
//         tenant: tenant,
//         start_date: new Date(),
//         end_date: new Date(),
//       },
//       {
//         name: 'Track C',
//         tenant: tenant,
//         start_date: new Date(),
//         end_date: new Date(),
//       },
//       {
//         name: 'Track D',
//         tenant: tenant,
//         start_date: new Date(),
//         end_date: new Date(),
//       },
//     ]);

//     // Create subjects for each track
//     const subjects = [];
//     for (const track of tracks) {
//       for (let i = 0; i < 5; i++) {
//         const subject = await queryRunner.manager.save(SubjectEntity, {
//           name: `Subject ${i + 1} for ${track.name}`,
//           track,
//         });
//         subjects.push(subject);
//       }
//     }

//     // Create learning periods for each academic year
//     const learningPeriods = [];
//     for (const academicYear of academicYears) {
//       for (let i = 0; i < 4; i++) {
//         const learningPeriod = await queryRunner.manager.save(
//           TrackLearningPeriodEntity,
//           {
//             name: `Period ${i + 1} for ${academicYear.from}-${academicYear.to}`,
//             academic_year_id: academicYear.id,
//             track: tracks[i % tracks.length],
//             start_date: new Date(academicYear.from, i * 3, 1),
//             end_date: new Date(academicYear.from, (i + 1) * 3, 0),
//           },
//         );
//         learningPeriods.push(learningPeriod);
//       }
//     }

//     // Create subject assignments
//     const subjectAssignments = [];
//     for (let i = 0; i < 50; i++) {
//       const student = await queryRunner.manager.findOne(StudentEntity, {
//         where: { id: i + 1 },
//       });

//       if (!student) continue;

//       const teacher = await queryRunner.manager.findOne(TeacherEntity, {
//         where: { id: (i % 15) + 1 },
//       });

//       if (!teacher) continue;

//       const subject = subjects[i % subjects.length];

//       const subjectAssignment = await queryRunner.manager.save(
//         SubjectAssignmentEntity,
//         {
//           student_id: student.id,
//           teacher_id: teacher.id,
//           subject_id: subject.id,
//           academic_year_id: academicYears[2].id, // Current academic year
//         },
//       );

//       subjectAssignments.push(subjectAssignment);
//     }

//     // Create subject assignment learning periods
//     for (const subjectAssignment of subjectAssignments) {
//       // Assign to all learning periods in the current academic year
//       for (let i = 8; i < 12; i++) {
//         // Learning periods 9-12 are for the current academic year
//         await queryRunner.manager.save(SubjectAssignmentLearningPeriodEntity, {
//           subject_assignment_id: subjectAssignment.id,
//           learning_period_id: learningPeriods[i].id,
//           completed: Math.random() > 0.3, // 70% chance of being completed
//         });
//       }
//     }

//     // Create samples for students
//     for (let i = 0; i < 200; i++) {
//       const student = await queryRunner.manager.findOne(StudentEntity, {
//         where: { id: (i % 75) + 1 },
//       });

//       if (!student) continue;

//       const teacher = await queryRunner.manager.findOne(TeacherEntity, {
//         where: { id: (i % 15) + 1 },
//       });

//       if (!teacher) continue;

//       const subject = subjects[i % subjects.length];

//       const learningPeriod =
//         learningPeriods[Math.floor(i / 50) % learningPeriods.length];

//       await queryRunner.manager.save(SampleEntity, {
//         student_id: student.id,
//         teacher_id: teacher.id,
//         subject_id: subject.id,
//         learning_period_id: learningPeriod.id,
//         assignment_title: `Assignment ${i + 1}`,
//         status: Math.random() > 0.3 ? 'COMPLETED' : 'PENDING', // 70% chance of being completed
//         created_at: new Date(
//           Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000,
//         ), // Random date within last 90 days
//         updated_at: new Date(),
//       });
//     }

//     // Create admin user
//     await queryRunner.manager.save(UserEntity, {
//       email: 'admin@test.com',
//       password: await argon2.hash('password'),
//       firstname: 'Admin',
//       lastname: 'Admin',
//       isActive: true,
//       emailVerified: true,
//       role: RolesEnum.SUPER_ADMIN,
//     });
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     // truncate all tables
//     await queryRunner.manager.query('TRUNCATE TABLE "tenants" CASCADE');
//     await queryRunner.manager.query('TRUNCATE TABLE "schools" CASCADE');
//     await queryRunner.manager.query('TRUNCATE TABLE "academies" CASCADE');
//     await queryRunner.manager.query('TRUNCATE TABLE "users" CASCADE');
//     await queryRunner.manager.query('TRUNCATE TABLE "directors" CASCADE');
//     await queryRunner.manager.query('TRUNCATE TABLE "teachers" CASCADE');
//     await queryRunner.manager.query('TRUNCATE TABLE "students" CASCADE');
//     await queryRunner.manager.query('TRUNCATE TABLE "tracks" CASCADE');
//     await queryRunner.manager.query('TRUNCATE TABLE "subjects" CASCADE');
//     await queryRunner.manager.query('TRUNCATE TABLE "track_calendar" CASCADE');
//     await queryRunner.manager.query(
//       'TRUNCATE TABLE "track_learning_periods" CASCADE',
//     );
//     await queryRunner.manager.query('TRUNCATE TABLE "samples" CASCADE');
//     await queryRunner.manager.query('TRUNCATE TABLE "semesters" CASCADE');
//     await queryRunner.manager.query('TRUNCATE TABLE "academic_years" CASCADE');
//     await queryRunner.manager.query(
//       'TRUNCATE TABLE "subject_assignments" CASCADE',
//     );
//     await queryRunner.manager.query(
//       'TRUNCATE TABLE "subject_assignment_learning_periods" CASCADE',
//     );
//   }
// }
