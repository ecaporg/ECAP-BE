import * as argon2 from 'argon2';
import { MigrationInterface, QueryRunner } from 'typeorm';

import { AcademyEntity } from '../src/school/entities/academy.entity';
import { SchoolEntity } from '../src/school/entities/school.entity';
import { TenantEntity } from '../src/school/entities/tenant.entity';
import { DirectorEntity } from '../src/staff/entities/director.entity';
import { TeacherEntity } from '../src/staff/entities/staff.entity';
import { StudentEntity } from '../src/students/entities/student.entity';
import { SubjectEntity } from '../src/track/entities/subject.entity';
import { TrackEntity } from '../src/track/entities/track.entity';
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
    ]);

    // Create academies
    const academies = await queryRunner.manager.save(AcademyEntity, [
      { name: 'Home', tenant },
      { name: 'Offline', tenant },
      { name: 'Flex', tenant },
    ]);

    // Create 50 random users
    const users = [];
    for (let i = 0; i < 50; i++) {
      const user = await queryRunner.manager.save(UserEntity, {
        email: `user${i}@test.com`,
        password: await argon2.hash('password'),
        firstname: `User${i}`,
        lastname: `Test`,
        isActive: true,
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 'STUDENT',
      });
      users.push(user);
    }

    // Assign directors
    for (let i = 0; i < 2; i++) {
      await queryRunner.manager.save(DirectorEntity, {
        user: users[i],
        school: schools[i % schools.length],
        academy: academies[i % academies.length],
      });
    }

    // Assign teachers
    for (let i = 2; i < 16; i++) {
      await queryRunner.manager.save(TeacherEntity, {
        user: users[i],
        school: schools[i % schools.length],
      });
    }

    // Assign students
    for (let i = 16; i < users.length; i++) {
      await queryRunner.manager.save(StudentEntity, {
        user: users[i],
        school: schools[i % schools.length],
        academy: academies[i % academies.length],
        grade: `Grade ${(i % 12) + 1}`,
      });
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
    ]);

    // Create subjects for each track
    for (const track of tracks) {
      for (let i = 0; i < 3; i++) {
        await queryRunner.manager.save(SubjectEntity, {
          name: `Subject ${i + 1}`,
          track,
        });
      }
    }

    await queryRunner.manager.save(UserEntity, {
      email: 'admin@test.com',
      password: await argon2.hash('password'),
      firstname: 'Admin',
      lastname: 'Admin',
      isActive: true,
      emailVerified: true,
      role: 'SUPER_ADMIN',
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // truncate all tables
    await queryRunner.manager.query('TRUNCATE TABLE "tenants" CASCADE');
    await queryRunner.manager.query('TRUNCATE TABLE "schools" CASCADE');
    await queryRunner.manager.query('TRUNCATE TABLE "academies" CASCADE');
    await queryRunner.manager.query('TRUNCATE TABLE "users" CASCADE');
    await queryRunner.manager.query('TRUNCATE TABLE "directors" CASCADE');
    await queryRunner.manager.query('TRUNCATE TABLE "teachers" CASCADE');
    await queryRunner.manager.query('TRUNCATE TABLE "students" CASCADE');
    await queryRunner.manager.query('TRUNCATE TABLE "tracks" CASCADE');
    await queryRunner.manager.query('TRUNCATE TABLE "subjects" CASCADE');
    await queryRunner.manager.query('TRUNCATE TABLE "track_calendar" CASCADE');
    await queryRunner.manager.query(
      'TRUNCATE TABLE "track_learning_periods" CASCADE',
    );
    await queryRunner.manager.query('TRUNCATE TABLE "samples" CASCADE');
    await queryRunner.manager.query('TRUNCATE TABLE "semesters" CASCADE');
  }
}
