import * as argon2 from 'argon2';
import { MigrationInterface, QueryRunner } from 'typeorm';

import { SemesterEntity } from '@/school/entities/semester.entity';
import { RolesEnum } from '@/users/enums/roles.enum';

import { AcademicYearEntity } from '../src/school/entities/academic-year.entity';
import { AcademyEntity } from '../src/school/entities/academy.entity';
import { SchoolEntity } from '../src/school/entities/school.entity';
import {
  AssignmentEntity,
  AssignmentPeriodEntity,
} from '../src/school/entities/subject-assignment.entity';
import { TenantEntity } from '../src/school/entities/tenant.entity';
import { DirectorEntity } from '../src/staff/entities/director.entity';
import { TeacherEntity } from '../src/staff/entities/staff.entity';
import { SampleEntity } from '../src/students/entities/sample.entity';
import { StudentEntity } from '../src/students/entities/student.entity';
import { SubjectEntity } from '../src/track/entities/subject.entity';
import { TrackEntity } from '../src/track/entities/track.entity';
import { TrackLearningPeriodEntity } from '../src/track/entities/track-learning-period.entity';
import { UserEntity } from '../src/users/entities/user.entity';

export class AddTestData1744271139400 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create a tenant
    const tenant = await queryRunner.manager.save(TenantEntity, {
      name: 'Test Tenant',
    });

    // Create schools
    const schools = await queryRunner.manager.save(SchoolEntity, [
      { name: 'School 1', tenant },
      { name: 'School 2', tenant },
      { name: 'School 3', tenant },
      { name: 'School 4', tenant },
      { name: 'School 5', tenant },
    ]);

    // Create academies
    const academies = await queryRunner.manager.save(AcademyEntity, [
      { name: 'Home', tenant },
      { name: 'Offline', tenant },
      { name: 'Flex', tenant },
      { name: 'Online', tenant },
      { name: 'Hybrid', tenant },
    ]);

    // Create academic years (including historical data)
    const currentYear = new Date().getFullYear();
    const academicYears = await queryRunner.manager.save(AcademicYearEntity, [
      { from: currentYear - 2, to: currentYear - 1 },
      { from: currentYear - 1, to: currentYear },
      { from: currentYear, to: currentYear + 1 },
    ]);

    // Create 100 random users (more for pagination testing)
    let users = [];
    for (let i = 0; i < 100; i++) {
      users.push({
        email: `user${i}@test.com`,
        password: await argon2.hash('password'),
        firstname: `User${i}`,
        lastname: `Test`,
        isActive: true,
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        role:
          i === 0
            ? RolesEnum.SUPER_ADMIN
            : i < 5
              ? RolesEnum.ADMIN
              : i < 20
                ? RolesEnum.TEACHER
                : i < 25
                  ? RolesEnum.DIRECTOR
                  : RolesEnum.STUDENT,
      });
    }
    users = await queryRunner.manager.save(UserEntity, users);

    // Assign directors
    for (let i = 0; i < 5; i++) {
      await queryRunner.manager.save(DirectorEntity, {
        user: users[i + 20], // Using users 20-24 for directors
        school: schools[i % schools.length],
        academy: academies[i % academies.length],
      });
    }

    // Assign teachers
    const teachers = [];
    for (let i = 0; i < 15; i++) {
      const teacher = await queryRunner.manager.save(TeacherEntity, {
        user: users[i + 5], // Using users 5-19 for teachers
        school: schools[i % schools.length],
      });
      teachers.push(teacher);
    }

    // Create tracks
    const tracks = await queryRunner.manager.save(TrackEntity, [
      {
        name: 'Track A',
        tenant: tenant,
        start_date: new Date(),
        end_date: new Date(),
      },
      {
        name: 'Track B',
        tenant: tenant,
        start_date: new Date(),
        end_date: new Date(),
      },
      {
        name: 'Track C',
        tenant: tenant,
        start_date: new Date(),
        end_date: new Date(),
      },
      {
        name: 'Track D',
        tenant: tenant,
        start_date: new Date(),
        end_date: new Date(),
      },
    ]);

    // Assign students
    let students = [];
    for (let i = 0; i < 75; i++) {
      students.push({
        user: users[i + 25], // Using users 25-99 for students
        school: schools[i % schools.length],
        academy: academies[i % academies.length],
        grade: `Grade ${(i % 12) + 1}`,
        track: tracks[i % tracks.length],
      });
    }
    students = await queryRunner.manager.save(StudentEntity, students);

    // Create subjects for each track
    let subjects = [];
    for (const track of tracks) {
      for (let i = 0; i < 5; i++) {
        subjects.push({
          name: `Subject ${i + 1} for ${track.name}`,
          track,
        });
      }
    }
    subjects = await queryRunner.manager.save(SubjectEntity, subjects);

    // Create learning periods for each academic year
    let learningPeriods = [];
    for (const academicYear of academicYears) {
      for (const track of tracks) {
        learningPeriods.push(
          ...[
            {
              name: `Period 1`,
              academic_year_id: academicYear.id,
              track: track,
              start_date: new Date(academicYear.from, 8, 1),
              end_date: new Date(academicYear.from, 10, 0),
            },
            {
              name: `Period 2`,
              academic_year_id: academicYear.id,
              track: track,
              start_date: new Date(academicYear.from, 10, 1),
              end_date: new Date(academicYear.to, 0, 1),
            },
            {
              name: `Period 3`,
              academic_year_id: academicYear.id,
              track: track,
              start_date: new Date(academicYear.to, 0, 2),
              end_date: new Date(academicYear.to, 3, 0),
            },
            {
              name: `Period 4`,
              academic_year_id: academicYear.id,
              track: track,
              start_date: new Date(academicYear.to, 3, 1),
              end_date: new Date(academicYear.to, 6, 0),
            },
          ],
        );
      }
    }

    learningPeriods = await queryRunner.manager.save(
      TrackLearningPeriodEntity,
      learningPeriods,
    );

    // Create assignments
    let assignments = [];
    for (let i = 0; i < 50; i++) {
      const teacher = teachers[i % teachers.length];
      const subject = subjects[i % subjects.length];

      for (const academicYear of academicYears) {
        assignments.push({
          school_id: teacher.school_id,
          teacher_id: teacher.user_id,
          subject,
          academic_year: academicYear,
        });
      }
    }
    assignments = await queryRunner.manager.save(AssignmentEntity, assignments);

    // Create assignment periods
    let assignmentPeriods = [];
    for (const assignment of assignments) {
      // Assign to all learning periods in the current academic year
      const student = students[Math.floor(Math.random() * students.length)];
      const filteredLearningPeriods = learningPeriods.filter(
        (lp) => lp.academic_year_id == assignment.academic_year_id,
      );

      if (filteredLearningPeriods.length === 0) {
        throw new Error(
          `No learning periods found for assignment ${assignment.id}`,
        );
      }

      for (const learningPeriod of filteredLearningPeriods) {
        assignmentPeriods.push({
          assignment,
          student,
          learning_period: learningPeriod,
          completed: Math.random() > 0.3,
        });
      }
    }
    assignmentPeriods = await queryRunner.manager.save(
      AssignmentPeriodEntity,
      assignmentPeriods,
    );

    // Create samples for students
    let samples = [];
    for (const assignmentPeriod of assignmentPeriods) {
      const isCompleted = Math.random() > 0.7 || assignmentPeriod.completed;
      const user_id = isCompleted
        ? assignmentPeriod.assignment.teacher_id
        : null;
      const school_id = isCompleted
        ? assignmentPeriod.assignment.school_id
        : null;
      samples.push(
        ...[
          {
            assignment_title: `Sample`,
            status: assignmentPeriod.completed ? 'COMPLETED' : 'PENDING',
            assignment_period_id: assignmentPeriod.id,
            user_id: assignmentPeriod.completed ? user_id : null,
            school_id: assignmentPeriod.completed ? school_id : null,
          },
          {
            assignment_title: `Sample 2`,
            status: isCompleted ? 'COMPLETED' : 'PENDING',
            assignment_period_id: assignmentPeriod.id,
            user_id,
            school_id,
          },
          {
            assignment_title: `Sample 3`,
            status: isCompleted ? 'COMPLETED' : 'PENDING',
            assignment_period_id: assignmentPeriod.id,
            user_id,
            school_id,
          },
        ],
      );
    }
    samples = await queryRunner.manager.save(SampleEntity, samples);
    // Create semesters
    for (const academicYear of academicYears) {
      await queryRunner.manager.save(SemesterEntity, [
        {
          name: 'Semester 1',
          academic_year_id: academicYear.id,
          start_date: new Date(academicYear.from, 8, 1),
          end_date: new Date(academicYear.from, 11, 0),
          tenant,
        },
        {
          name: 'Semester 2',
          academic_year_id: academicYear.id,
          start_date: new Date(academicYear.to, 0, 1),
          end_date: new Date(academicYear.to, 7, 31),
          tenant,
        },
      ]);
    }

    // Create admin user
    await queryRunner.manager.save(UserEntity, {
      email: 'admin@test.com',
      password: await argon2.hash('password'),
      firstname: 'Admin',
      lastname: 'Admin',
      isActive: true,
      emailVerified: true,
      role: RolesEnum.SUPER_ADMIN,
    });
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
      'TRUNCATE TABLE "assignments" RESTART IDENTITY CASCADE',
    );
    await queryRunner.manager.query(
      'TRUNCATE TABLE "assignment_periods" RESTART IDENTITY CASCADE',
    );
  }
}
