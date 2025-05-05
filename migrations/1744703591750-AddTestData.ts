import * as argon2 from 'argon2';
import { MigrationInterface, QueryRunner } from 'typeorm';

import { CourseEntity } from '@/course/entities/course.entity';
import { SemesterEntity } from '@/school/entities/semester.entity';
import {
  AdminEntity,
  DirectorEntity,
  TeacherEntity,
} from '@/staff/entities/staff.entity';
import { SampleFlagMissingWorkEntity } from '@/students/entities/sample-flag.entity';
import { SampleFlagErrorEntity } from '@/students/entities/sample-flag.entity';
import { RolesEnum } from '@/users/enums/roles.enum';

import { AcademicYearEntity } from '../src/school/entities/academic-year.entity';
import { AcademyEntity } from '../src/school/entities/academy.entity';
import { AssignmentPeriodEntity } from '../src/school/entities/assignment.entity';
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
    ]);

    // Create academies
    const academies = await queryRunner.manager.save(AcademyEntity, [
      { name: 'Home', tenant },
      { name: 'Offline', tenant },
      { name: 'Flex', tenant },
    ]);

    const director_users = await queryRunner.manager.save(
      UserEntity,
      academies.map(
        (academy, idx) =>
          ({
            email: `director${idx}@test.com`,
            password,
            firstname: 'Director',
            lastname: academy.name,
            isActive: true,
            emailVerified: true,
            role: RolesEnum.DIRECTOR,
          }) as UserEntity,
      ),
    );
    // Create directors
    const directors = await queryRunner.manager.save(
      DirectorEntity,
      academies.map(
        (academy, idx) =>
          ({
            user: director_users[idx],
            academy,
            tenant,
          }) as DirectorEntity,
      ),
    );

    // Create academic years (including historical data)
    const currentYear = new Date().getFullYear();
    const academicYears = await queryRunner.manager.save(AcademicYearEntity, [
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
    let global_courses = [] as CourseEntity[];

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
          global_courses.push({
            school_id: school.id,
            teacher_id: teacher.id,
            academic_year: academicYear,
          } as CourseEntity);
        }
      }
      global_teachers.push(...teachers);
    }

    global_courses = (await queryRunner.manager.save(
      CourseEntity,
      global_courses,
    )) as CourseEntity[];

    for (const academicYear of academicYears) {
      // Create tracks
      const tracks = await queryRunner.manager.save(TrackEntity, [
        {
          name: `Track A`,
          tenant,
          start_date: new Date(academicYear.from, 8, 1),
          end_date: new Date(academicYear.to, 6, 0),
          academic_year_id: academicYear.id,
        } as TrackEntity,
        {
          name: `Track B`,
          tenant,
          start_date: new Date(academicYear.from, 8, 1),
          end_date: new Date(academicYear.to, 6, 0),
          academic_year_id: academicYear.id,
        } as TrackEntity,
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
        const random_day = Math.floor(Math.random() * 15);
        const random_month = Math.floor(Math.random() * 2);
        let learningPeriods = [
          {
            name: `Learning Period 1`,
            track,
            start_date: new Date(
              academicYear.from,
              8 + random_month,
              1 + random_day,
            ),
            end_date: new Date(
              academicYear.from,
              10 + random_month,
              0 + random_day,
            ),
          },
          {
            name: `Learning Period 2`,
            track,
            start_date: new Date(
              academicYear.from,
              10 + random_month,
              1 + random_day,
            ),
            end_date: new Date(
              academicYear.to,
              0 + random_month,
              1 + random_day,
            ),
          },
          {
            name: `Learning Period 3`,
            track,
            start_date: new Date(
              academicYear.to,
              0 + random_month,
              2 + random_day,
            ),
            end_date: new Date(
              academicYear.to,
              3 + random_month,
              0 + random_day,
            ),
          },
          {
            name: `Learning Period 4`,
            track,
            start_date: new Date(
              academicYear.to,
              3 + random_month,
              1 + random_day,
            ),
            end_date: new Date(
              academicYear.to,
              6 + random_month,
              0 + random_day,
            ),
          },
        ] as TrackLearningPeriodEntity[];

        learningPeriods = await queryRunner.manager.save(
          TrackLearningPeriodEntity,
          learningPeriods,
        );
        // Create assignment periods
        const track_index = tracks.findIndex(
          (arr_track) => arr_track.id == track.id,
        );
        const filtered_courses = global_courses.filter(
          (as, index) =>
            track_index % index == 0 && as.academic_year_id == academicYear.id,
        );

        const assignmentPeriods = [];
        for (const course of filtered_courses) {
          // Assign to all learning periods in the current academic year
          const local_assignmentPeriods = [];
          const filteredStudents = students.filter(
            (student) =>
              student.track_id == track.id &&
              student.school_id == course.school_id,
          );
          for (const student of filteredStudents) {
            for (const learningPeriod of learningPeriods) {
              const completed = Math.random() > 0.3;
              local_assignmentPeriods.push({
                course,
                student,
                learning_period: learningPeriod,
                completed,
                percentage: completed ? 100 : 0,
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
        let samples: SampleEntity[] = [];
        for (const assignmentPeriod of assignmentPeriods) {
          const filteredSubjects = subjects.filter(
            (subject) => subject.track_id == track.id,
          );

          for (const subject of filteredSubjects) {
            const isCompleted =
              Math.random() > 0.7 || assignmentPeriod.completed;
            const user_id = isCompleted
              ? assignmentPeriod.course.teacher_id
              : null;

            const status = isCompleted
              ? SampleStatus.COMPLETED
              : Math.random() > 0.5
                ? SampleStatus.ERRORS_FOUND
                : Math.random() > 0.5
                  ? SampleStatus.MISSING_SAMPLE
                  : SampleStatus.PENDING;

            const flag_category =
              status == SampleStatus.ERRORS_FOUND
                ? SampleFlagCategory.ERROR_IN_SAMPLE
                : null;

            samples.push(
              ...([
                {
                  assignment_title: `Sample`,
                  status: assignmentPeriod.completed ? 'COMPLETED' : 'PENDING',
                  assignment_period_id: assignmentPeriod.id,
                  done_by_id: assignmentPeriod.completed ? user_id : null,
                  subject_id: subject.id,
                  flag_category,
                },
                {
                  assignment_title: `Sample 2`,
                  status,
                  assignment_period_id: assignmentPeriod.id,
                  done_by_id: user_id,
                  subject_id: subject.id,
                  flag_category,
                },
              ] as SampleEntity[]),
            );
          }
        }
        samples = await queryRunner.manager.save(SampleEntity, samples, {
          chunk: 1000,
        });

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
                comment: `Comment ${Math.random()}`,
              }) as SampleFlagErrorEntity,
          ),
        );
        await queryRunner.manager.save(
          SampleFlagMissingWorkEntity,
          sample_flag_missing_work.map(
            (sample) =>
              ({
                sample,
                reason: `Reason ${Math.random()}`,
              }) as SampleFlagMissingWorkEntity,
          ),
        );
      }
    }

    // Create admin user
    const admin = await queryRunner.manager.save(UserEntity, {
      email: 'admin@test.com',
      password: await argon2.hash('password'),
      firstname: 'Admin',
      lastname: 'Admin',
      isActive: true,
      emailVerified: true,
      role: RolesEnum.SUPER_ADMIN,
    });

    await queryRunner.manager.save(AdminEntity, {
      user: admin,
      tenant,
    });

    const assignment_periods = await queryRunner.manager.find(
      AssignmentPeriodEntity,
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
    await queryRunner.manager.save(AssignmentPeriodEntity, assignment_periods);
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
      'TRUNCATE TABLE "courses" RESTART IDENTITY CASCADE',
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
