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
    const password = await argon2.hash('password');
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

    let subjects = [] as SubjectEntity[];
    for (const track of tracks) {
      subjects.push(
        ...Array.from(
          { length: 5 },
          (_, i) =>
            ({
              name: `Subject ${i + 1} for ${track.name}`,
              track,
            }) as SubjectEntity,
        ),
      );
    }
    subjects = await queryRunner.manager.save(SubjectEntity, subjects);

    // Create academic years (including historical data)
    const currentYear = new Date().getFullYear();
    const academicYears = await queryRunner.manager.save(AcademicYearEntity, [
      { from: currentYear - 2, to: currentYear - 1 },
      { from: currentYear - 1, to: currentYear },
      { from: currentYear, to: currentYear + 1 },
    ]);

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

    // Create learning periods for each academic year

    const global_teachers = [] as TeacherEntity[];
    let global_assignments = [] as AssignmentEntity[];

    for (const school of schools) {
      const teacher_users = await queryRunner.manager.save(
        UserEntity,
        Array.from(
          { length: 15 },
          (_, i) =>
            ({
              firstname: `Teacher ${i}`,
              lastname: `${school.name}`,
              email: `teacher${i}_${school.name.replace(' ', '_')}@test.com`,
              password,
              isActive: true,
              emailVerified: true,
              role: RolesEnum.TEACHER,
            }) as UserEntity,
        ),
      );

      const teachers = await queryRunner.manager.save(
        TeacherEntity,
        Array.from(
          { length: 15 },
          (_, i) =>
            ({
              user: teacher_users[i],
            }) as TeacherEntity,
        ),
      );

      for (const academicYear of academicYears) {
        for (const teacher of teachers) {
          global_assignments.push({
            school_id: school.id,
            teacher_id: teacher.id,
            academic_year: academicYear,
          } as AssignmentEntity);
        }
      }
      global_teachers.push(...teachers);

      const director_users = await queryRunner.manager.save(
        UserEntity,
        academies.map(
          (academy) =>
            ({
              email: `${academy.name}_${school.name.replace(' ', '_')}@test.com`,
              password,
              firstname: `${academy.name} Director`,
              lastname: 'Test',
              isActive: true,
              emailVerified: true,
              role: RolesEnum.DIRECTOR,
            }) as UserEntity,
        ),
      );

      await queryRunner.manager.save(
        DirectorEntity,
        academies.map((academy, index) => ({
          user: director_users[index],
          school,
          academy,
        })),
      );
    }

    global_assignments = (await queryRunner.manager.save(
      AssignmentEntity,
      global_assignments,
    )) as AssignmentEntity[];

    for (const academicYear of academicYears) {
      // Create assignments

      const students = [] as StudentEntity[];
      for (const school of schools) {
        const users = await queryRunner.manager.save(
          UserEntity,
          Array.from(
            { length: 100 },
            (_, i) =>
              ({
                email: `user${i}_${school.name.replace(' ', '_')}_${academicYear.from}_${academicYear.to}@test.com`,
                password,
                firstname: `User${i}`,
                lastname: `Test`,
                isActive: true,
                emailVerified: true,
                role: RolesEnum.STUDENT,
              }) as UserEntity,
          ),
        );

        const logcal = await queryRunner.manager.save(
          StudentEntity,
          users.map(
            (user, i) =>
              ({
                user,
                school_id: school.id,
                academy_id: academies[i % academies.length].id,
                track_id: tracks[i % tracks.length].id,
                grade: `Grade ${(i % 12) + 1}`,
              }) as StudentEntity,
          ),
        );
        students.push(...logcal);
      }

      for (const track of tracks) {
        let learningPeriods = [
          {
            name: `Learning Period 1`,
            academic_year_id: academicYear.id,
            track,
            start_date: new Date(academicYear.from, 8, 1),
            end_date: new Date(academicYear.from, 10, 0),
          },
          {
            name: `Learning Period 2`,
            academic_year_id: academicYear.id,
            track,
            start_date: new Date(academicYear.from, 10, 1),
            end_date: new Date(academicYear.to, 0, 1),
          },
          {
            name: `Learning Period 3`,
            academic_year_id: academicYear.id,
            track,
            start_date: new Date(academicYear.to, 0, 2),
            end_date: new Date(academicYear.to, 3, 0),
          },
          {
            name: `Learning Period 4`,
            academic_year_id: academicYear.id,
            track,
            start_date: new Date(academicYear.to, 3, 1),
            end_date: new Date(academicYear.to, 6, 0),
          },
        ];

        learningPeriods = await queryRunner.manager.save(
          TrackLearningPeriodEntity,
          learningPeriods,
        );
        // Create assignment periods
        const track_index = tracks.findIndex(
          (arr_track) => arr_track.id == track.id,
        );
        const filtered_assignments = global_assignments.filter(
          (as, index) =>
            track_index % index == 0 && as.academic_year_id == academicYear.id,
        );

        const assignmentPeriods = [];
        for (const assignment of filtered_assignments) {
          // Assign to all learning periods in the current academic year
          const local_assignmentPeriods = [];
          const filteredStudents = students.filter(
            (student) =>
              student.track_id == track.id &&
              student.school_id == assignment.school_id,
          );
          for (const student of filteredStudents) {
            for (const learningPeriod of learningPeriods) {
              local_assignmentPeriods.push({
                assignment,
                student,
                learning_period: learningPeriod,
                completed: Math.random() > 0.3,
              } as AssignmentPeriodEntity);
            }
          }
          assignmentPeriods.push(
            ...(await queryRunner.manager.save(
              AssignmentPeriodEntity,
              local_assignmentPeriods,
            )),
          );
        }

        // Create samples for students
        let samples = [];
        for (const assignmentPeriod of assignmentPeriods) {
          const filteredSubjects = subjects.filter(
            (subject) => subject.track_id == track.id,
          );

          for (const subject of filteredSubjects) {
            const isCompleted =
              Math.random() > 0.7 || assignmentPeriod.completed;
            const user_id = isCompleted
              ? assignmentPeriod.assignment.teacher_id
              : null;

            samples.push(
              ...([
                {
                  assignment_title: `Sample`,
                  status: assignmentPeriod.completed ? 'COMPLETED' : 'PENDING',
                  assignment_period_id: assignmentPeriod.id,
                  done_by_id: assignmentPeriod.completed ? user_id : null,
                  subject_id: subject.id,
                },
                {
                  assignment_title: `Sample 2`,
                  status: isCompleted ? 'COMPLETED' : 'PENDING',
                  assignment_period_id: assignmentPeriod.id,
                  done_by_id: user_id,
                  subject_id: subject.id,
                },
              ] as SampleEntity[]),
            );
          }
        }
        samples = await queryRunner.manager.save(SampleEntity, samples, {
          chunk: 1000,
        });
      }
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

/*


1. Super Admin:
- Email (unique)
- First name
- Last name
- Password

2. Schools :
- School name (up to 50 characters)


3. Academies :
- Academy name (up to 50 characters)

5. Track :
- Track name (up to 50 characters)
- Start date (example: 2024-08-01)
- End date (example: 2024-11-30)

6. Subjects :
- Subject name (up to 50 characters)
- Which track it belongs to

7. Academic Year (academic_year):
- year/year (example: 2024/2025)

8. Semesters :
- start date (example: 2024-08-01)
- end date (example: 2024-11-30)

9. Learning Periods:
- name (example: Learning Period 1)
- start date (example: 2024-08-01)
- end date (example: 2024-11-30)
- which track it belongs to (example: Track A)

10. Track Calendar :
- if you have a text format - it's great, but if you don't have it, I will try extract it from the pdf

11. Students :
- Email (unique)
- First name
- Last name
- Password
- School
- Academy
- Track
- Grade (up to 50 characters)

12. Teachers:
- Email (unique)
- First name
- Last name
- Password
- School

13. Directors:
- Email (unique)
- First name
- Last name
- Password
- School

14. Administrators:
- Email (unique)
- First name
- Last name
- Password
- In which schools they work (example: School A, School B, School C)


15. Relations between teachers, students and subjects (This entity should represent which subject is taught by a specific teacher and which students are enrolled in that subject):
- School (example: School A, School B, School C)
- Teacher email (example: teacher@test.com)
- Subject (The subject name should be provided, and if the subject belongs to a specific track, the associated track should also be indicated)
- Academic Year (example: 2024/2025)
- List of students (example: student@test.com, student2@test.com, student3@test.com)
*/
