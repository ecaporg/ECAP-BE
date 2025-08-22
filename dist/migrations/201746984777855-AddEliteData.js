"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEliteData201746984777855 = void 0;
const argon2 = require("argon2");
const fs_1 = require("fs");
const student_enrollment_entity_1 = require("../src/enrollment/entities/student-enrollment.entity");
const teacher_enrollment_entity_1 = require("../src/enrollment/entities/teacher-enrollment.entity");
const staff_entity_1 = require("../src/staff/entities/staff.entity");
const sample_flag_entity_1 = require("../src/students/entities/sample-flag.entity");
const sample_flag_entity_2 = require("../src/students/entities/sample-flag.entity");
const key_entity_1 = require("../src/tenant/entities/key.entity");
const academic_year_entity_1 = require("../src/track/entities/academic-year.entity");
const semester_entity_1 = require("../src/track/entities/semester.entity");
const track_calendar_entity_1 = require("../src/track/entities/track-calendar.entity");
const roles_enum_1 = require("../src/users/enums/roles.enum");
const academy_entity_1 = require("../src/school/entities/academy.entity");
const school_entity_1 = require("../src/school/entities/school.entity");
const sample_entity_1 = require("../src/students/entities/sample.entity");
const student_entity_1 = require("../src/students/entities/student.entity");
const tenant_entity_1 = require("../src/tenant/entities/tenant.entity");
const subject_entity_1 = require("../src/track/entities/subject.entity");
const track_entity_1 = require("../src/track/entities/track.entity");
const track_learning_period_entity_1 = require("../src/track/entities/track-learning-period.entity");
const user_entity_1 = require("../src/users/entities/user.entity");
class AddEliteData201746984777855 {
    async up(queryRunner) {
        this.password = await argon2.hash('password');
        const tenant = await this.createTenant(queryRunner);
        const schools = await this.createSchool(queryRunner, tenant);
        const academies = await this.createAcademy(queryRunner, tenant);
        await this.createDirectors(queryRunner, academies, tenant);
        const academicYears = await this.createAcademicYears(queryRunner);
        const { enrollments } = await this.createTeachersAndEnrollments(queryRunner, schools, academicYears);
        const students = await this.createStudents(queryRunner, schools, academies);
        for (const academicYear of academicYears) {
            const tracks = await this.createTracks(queryRunner, academicYear, tenant);
            await this.createSemesters(queryRunner, tracks);
            for (let track_index = 0; track_index < tracks.length; track_index++) {
                const track = tracks[track_index];
                const learningPeriods = await this.createLearningPeriods(queryRunner, track, academicYear);
                const studentLPEnrollments = await this.createStudentLPEnrollments(queryRunner, learningPeriods, students, enrollments, track, academicYear);
                const subjects = await this.createSubjects(queryRunner, track);
                const samples = await this.createSamples(queryRunner, studentLPEnrollments, subjects);
                await this.deleteRedunantData(queryRunner, samples, subjects, track);
            }
        }
        await this.createAdmin(queryRunner, tenant);
        await this.recalculateAssignmentPeriods(queryRunner);
    }
    async down(queryRunner) {
        await queryRunner.manager.query('TRUNCATE TABLE "tenants" RESTART IDENTITY CASCADE');
        await queryRunner.manager.query('TRUNCATE TABLE "schools" RESTART IDENTITY CASCADE');
        await queryRunner.manager.query('TRUNCATE TABLE "academies" RESTART IDENTITY CASCADE');
        await queryRunner.manager.query('TRUNCATE TABLE "users" RESTART IDENTITY CASCADE');
        await queryRunner.manager.query('TRUNCATE TABLE "directors" RESTART IDENTITY CASCADE');
        await queryRunner.manager.query('TRUNCATE TABLE "teachers" RESTART IDENTITY CASCADE');
        await queryRunner.manager.query('TRUNCATE TABLE "students" RESTART IDENTITY CASCADE');
        await queryRunner.manager.query('TRUNCATE TABLE "tracks" RESTART IDENTITY CASCADE');
        await queryRunner.manager.query('TRUNCATE TABLE "subjects" RESTART IDENTITY CASCADE');
        await queryRunner.manager.query('TRUNCATE TABLE "track_calendar" RESTART IDENTITY CASCADE');
        await queryRunner.manager.query('TRUNCATE TABLE "track_learning_periods" RESTART IDENTITY CASCADE');
        await queryRunner.manager.query('TRUNCATE TABLE "samples" RESTART IDENTITY CASCADE');
        await queryRunner.manager.query('TRUNCATE TABLE "semesters" RESTART IDENTITY CASCADE');
        await queryRunner.manager.query('TRUNCATE TABLE "academic_years" RESTART IDENTITY CASCADE');
        await queryRunner.manager.query('TRUNCATE TABLE "teacher_school_year_enrollments" RESTART IDENTITY CASCADE');
        await queryRunner.manager.query('TRUNCATE TABLE "student_lp_enrollments" RESTART IDENTITY CASCADE');
    }
    async createTenant(queryRunner) {
        const tenant = await queryRunner.manager.save(tenant_entity_1.TenantEntity, {
            name: 'Elite',
            root_id: 1,
        });
        await queryRunner.manager.save(key_entity_1.KeyEntity, {
            access_token: process.env.ELITE_KEY,
            url: 'https://eliteaa.instructure.com',
            session_token: process.env.ELITE_SESSION_TOKEN,
            tenant,
        });
        return tenant;
    }
    createSchool(queryRunner, tenant) {
        return queryRunner.manager.save(school_entity_1.SchoolEntity, [
            { name: 'Mountain Empire', tenant },
            { name: 'Lucerne', tenant },
        ]);
    }
    createAcademy(queryRunner, tenant) {
        return queryRunner.manager.save(academy_entity_1.AcademyEntity, [
            { name: 'Homeschool', tenant },
            { name: 'Flex', tenant },
            { name: 'Virtual', tenant },
        ]);
    }
    async createDirectors(queryRunner, academies, tenant) {
        const director_users = await queryRunner.manager.save(user_entity_1.UserEntity, academies.map((academy, idx) => ({
            email: `director${idx}@test.com`,
            password: this.password,
            name: 'Director',
            isActive: true,
            emailVerified: true,
            role: roles_enum_1.RolesEnum.DIRECTOR,
        })));
        const directors = await queryRunner.manager.save(staff_entity_1.DirectorEntity, academies.map((academy, idx) => ({
            user: director_users[idx],
            academy,
            tenant,
        })));
        return directors;
    }
    createAcademicYears(queryRunner) {
        return queryRunner.manager.save(academic_year_entity_1.AcademicYearEntity, [
            { from: 2024, to: 2025 },
        ]);
    }
    async createSemesters(queryRunner, tracks) {
        for (const track of tracks) {
            const semester1StartDate = new Date(track.start_date);
            const semester2EndDate = new Date(track.end_date);
            const semester1EndDate = new Date(`${semester1StartDate.getFullYear()}-01-16T00:00:00.000Z`);
            const semester2StartDate = new Date(`${semester1StartDate.getFullYear()}-06-17T00:00:00.000Z`);
            await queryRunner.manager.save(semester_entity_1.SemesterEntity, [
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
    async createTeachersAndEnrollments(queryRunner, schools, academicYears) {
        const global_teachers = [];
        const enrollments = [];
        const peoples = JSON.parse((0, fs_1.readFileSync)('migrations/elite-data/teachers.json', 'utf8'));
        const teacher_users = await queryRunner.manager.save(user_entity_1.UserEntity, peoples.map((person) => ({
            email: person.email,
            password: this.password,
            name: person.name,
            isActive: true,
            emailVerified: true,
            role: roles_enum_1.RolesEnum.TEACHER,
            canvas_additional_info: {
                canvas_id: person.id,
                sis_user_id: person.sis_user_id,
                sis_import_id: person.sis_import_id,
                avatar_url: person.avatar_url,
                time_zone: person.time_zone,
            },
        })));
        const teachers = await queryRunner.manager.save(staff_entity_1.TeacherEntity, teacher_users.map((user) => ({
            user,
        })));
        for (const school of schools) {
            for (const academicYear of academicYears) {
                for (const teacher of teachers) {
                    enrollments.push({
                        school,
                        teacher,
                        academic_year: academicYear,
                    });
                }
            }
            global_teachers.push(...teachers);
        }
        await queryRunner.manager.save(teacher_enrollment_entity_1.TeacherSchoolYearEnrollmentEntity, enrollments);
        return { global_teachers, enrollments };
    }
    async createTracks(queryRunner, academicYear, tenant) {
        const tracks = await queryRunner.manager.save(track_entity_1.TrackEntity, [
            {
                name: `Track A`,
                tenant,
                start_date: new Date(academicYear.from, 7, 1),
                end_date: new Date(academicYear.to, 6, 10),
                academicYear,
            },
            {
                name: `Track B`,
                tenant,
                start_date: new Date(academicYear.from, 8, 27),
                end_date: new Date(academicYear.to, 6, 10),
                academicYear,
            },
        ]);
        await queryRunner.manager.save(track_calendar_entity_1.TrackCalendarEntity, [
            {
                track: tracks[0],
                days: [],
            },
            {
                track: tracks[1],
                days: [],
            },
        ]);
        return tracks;
    }
    async createSubjects(queryRunner, track) {
        const courses = JSON.parse((0, fs_1.readFileSync)('migrations/elite-data/courses.json', 'utf8'));
        const assignments = JSON.parse((0, fs_1.readFileSync)('migrations/elite-data/assignments-filtered.json', 'utf8'));
        const subjects = courses
            .filter((course) => course.term.name.includes(`${track.academicYear.from}/${track.academicYear.to}`) &&
            assignments.some((assignment) => assignment.course_id == course.id))
            .map((course) => ({
            name: course.name
                .replaceAll(/\b\d{0,2}[ABKX]\b/g, '')
                .replaceAll('Flex', '')
                .trim(),
            track,
            canvas_course_id: course.id,
            canvas_additional_info: {
                sis_course_id: course.sis_course_id,
                sis_import_id: course.sis_import_id,
                account_id: course.account_id,
                course_code: course.course_code,
                enrollment_term_id: course.enrollment_term_id,
                uuid: course.uuid,
            },
        }));
        return queryRunner.manager.save(subject_entity_1.SubjectEntity, subjects);
    }
    async createStudents(queryRunner, schools, academies) {
        const peoples = JSON.parse((0, fs_1.readFileSync)('migrations/elite-data/students.json', 'utf8'));
        const users = await queryRunner.manager.save(user_entity_1.UserEntity, peoples.map((person) => ({
            email: person.email
                ? `${person.id}+${person.email}`
                : `${person.id}@test.com`,
            password: this.password,
            name: person.name,
            isActive: true,
            emailVerified: true,
            role: roles_enum_1.RolesEnum.STUDENT,
            canvas_additional_info: {
                canvas_id: person.id,
                sis_user_id: person.sis_user_id,
                sis_import_id: person.sis_import_id,
                avatar_url: person.avatar_url,
                time_zone: person.time_zone,
                track_name: person.sis?.schooltracks_title
                    ? `Track ${person.sis.schooltracks_title}`
                    : null,
                grade: person.sis?.lccgradelevels_gradelevel,
            },
        })));
        const students = await queryRunner.manager.save(student_entity_1.StudentEntity, users.map((user) => {
            const person = peoples.find((p) => p.id == user.canvas_additional_info.canvas_id);
            const school = schools.find((s) => s.name ==
                (person?.sis?.scope_title == 'mountainelite'
                    ? 'Mountain Empire'
                    : 'Lucerne'));
            const academy = academies.find((a) => a.name == person?.sis?.lc_name);
            return {
                user,
                academy_id: academy?.id,
                school_id: school?.id,
            };
        }));
        return students;
    }
    async createLearningPeriods(queryRunner, track, academicYear) {
        let learningPeriods = [];
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
            ];
        }
        else {
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
            ];
        }
        learningPeriods = await queryRunner.manager.save(track_learning_period_entity_1.TrackLearningPeriodEntity, learningPeriods);
        return learningPeriods;
    }
    async createStudentLPEnrollments(queryRunner, learningPeriods, students, enrollments, track, academicYear) {
        const filtered_enrollments = enrollments.filter((as) => as.academic_year_id == academicYear.id);
        const teacherStudentRelation = JSON.parse((0, fs_1.readFileSync)('migrations/elite-data/teacher-student-relation.json', 'utf8'));
        const assignmentPeriods = [];
        for (const enrollment of filtered_enrollments) {
            const local_assignmentPeriods = [];
            const filteredStudents = students.filter((student) => student.school_id == enrollment.school_id &&
                student.user.canvas_additional_info.track_name == track.name);
            for (const student of filteredStudents) {
                if (!enrollment.teacher.user.canvas_additional_info)
                    throw new Error('Teacher has no additional info');
                if (!teacherStudentRelation[student.user.canvas_additional_info.canvas_id]?.includes(enrollment.teacher.user.canvas_additional_info.canvas_id)) {
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
                        student_grade: `Grade ${student.user.canvas_additional_info.grade}`,
                    });
                }
            }
            assignmentPeriods.push(...(await queryRunner.manager.save(student_enrollment_entity_1.StudentLPEnrollmentEntity, local_assignmentPeriods)));
        }
        return assignmentPeriods;
    }
    async createSamples(queryRunner, studentLPEnrollments, subjects) {
        const samples = [];
        const submissions = JSON.parse((0, fs_1.readFileSync)('migrations/elite-data/submissions.json', 'utf8')).flatMap((e) => e);
        const assignmentsMap = new Map(JSON.parse((0, fs_1.readFileSync)('migrations/elite-data/assignments-filtered.json', 'utf8')).map((assignment) => [Number(assignment.id), assignment]));
        const coursesMap = new Map(JSON.parse((0, fs_1.readFileSync)('migrations/elite-data/courses.json', 'utf8')).map((course) => [Number(course.id), course]));
        const subjectMap = new Map(subjects.map((s) => [Number(s.canvas_course_id), s]));
        const studentSubmitions = submissions.filter((submission) => !submission.excused &&
            submission.user_id &&
            studentLPEnrollments.some((s) => s.student.user.canvas_additional_info.canvas_id ==
                submission.user_id.toString()));
        samples.push(...studentSubmitions.map((s) => {
            const assignment = assignmentsMap.get(Number(s.assignment_id));
            const due_at = new Date(assignment.due_at);
            const course = coursesMap.get(Number(assignment.course_id));
            const subject = subjectMap.get(Number(course.id));
            const enrollments = studentLPEnrollments.filter((se) => se.student.user.canvas_additional_info.canvas_id ==
                s.user_id.toString() &&
                due_at >= new Date(se.learning_period.start_date) &&
                due_at <= new Date(se.learning_period.end_date));
            const status = s.missing || s.workflow_state === 'unsubmitted'
                ? sample_entity_1.SampleStatus.MISSING_SAMPLE
                : !s.grade || !assignment?.name
                    ? sample_entity_1.SampleStatus.ERRORS_FOUND
                    : s.workflow_state === 'graded'
                        ? sample_entity_1.SampleStatus.COMPLETED
                        : sample_entity_1.SampleStatus.PENDING;
            return {
                assignment_title: assignment?.name,
                grade: s.grade,
                date: s.submitted_at ? new Date(s.submitted_at) : undefined,
                status,
                subject,
                preview_url: s.preview_url,
                student_lp_enrollments: enrollments,
                canvas_submission_id: s.id ? Number(s.id) : undefined,
                done_by_id: status == sample_entity_1.SampleStatus.COMPLETED
                    ? enrollments[0]?.teacher_school_year_enrollment?.teacher_id
                    : undefined,
            };
        }));
        const res = await queryRunner.manager.save(sample_entity_1.SampleEntity, samples, {
            chunk: 500,
        });
        return res.length ? res : samples;
    }
    async createSampleFlags(queryRunner, samples) {
        const sample_flag_errors = samples.filter((sample) => sample.status == sample_entity_1.SampleStatus.ERRORS_FOUND);
        const sample_flag_missing_work = samples.filter((sample) => sample.status == sample_entity_1.SampleStatus.MISSING_SAMPLE);
        await queryRunner.manager.save(sample_flag_entity_2.SampleFlagErrorEntity, sample_flag_errors.map((sample) => ({
            sample,
            comment: 'Grade is missing',
        })), {
            chunk: 1000,
        });
        await queryRunner.manager.save(sample_flag_entity_1.SampleFlagMissingWorkEntity, sample_flag_missing_work.map((sample) => ({
            sample,
            reason: 'No submission',
        })), {
            chunk: 1000,
        });
    }
    async createAdmin(queryRunner, tenant) {
        const cheredia = await queryRunner.manager.findOne(user_entity_1.UserEntity, {
            where: { email: 'cheredia@eliteacademic.com' },
        });
        const admin = await queryRunner.manager.save(user_entity_1.UserEntity, [
            {
                email: 'admin@test.com',
                password: await argon2.hash('password'),
                name: 'Admin',
                isActive: true,
                emailVerified: true,
                role: roles_enum_1.RolesEnum.SUPER_ADMIN,
            },
            {
                email: 'rgonzalez@eliteacademic.com',
                password: await argon2.hash('password'),
                name: 'Rachel Gonzalez',
                isActive: true,
                emailVerified: true,
                role: roles_enum_1.RolesEnum.ADMIN,
            },
            {
                ...cheredia,
                role: roles_enum_1.RolesEnum.ADMIN,
            },
        ]);
        await queryRunner.manager.save(staff_entity_1.AdminEntity, admin.map((user) => ({
            user,
            tenant,
        })));
    }
    async recalculateAssignmentPeriods(queryRunner) {
        await queryRunner.manager.query(`
        WITH assignment_stats AS (
    SELECT 
      sle.id,
      COUNT(s.id) as total_samples,
      COUNT(CASE WHEN s.status = 'COMPLETED' THEN 1 END) as completed_samples,
      CASE 
        WHEN COUNT(s.id) > 0 THEN 
          (COUNT(CASE WHEN s.status = 'COMPLETED' THEN 1 END)::decimal / COUNT(s.id)::decimal) * 100
        ELSE 0 
      END as calculated_percentage,
      CASE 
        WHEN COUNT(s.id) = 0 THEN false
        WHEN COUNT(s.id) = COUNT(CASE WHEN s.status = 'COMPLETED' THEN 1 END) THEN true
        ELSE false
      END as is_completed
    FROM student_lp_enrollments sle
    LEFT JOIN student_lp_enrollments_samples_samples slss ON slss."studentLpEnrollmentsId" = sle.id
    LEFT JOIN samples s ON s.id = slss."samplesId"
    WHERE sle.completed = false
    GROUP BY sle.id
  )
  UPDATE student_lp_enrollments 
  SET 
    percentage = assignment_stats.calculated_percentage,
    completed = assignment_stats.is_completed,
    "updatedAt" = NOW()
  FROM assignment_stats
  WHERE student_lp_enrollments.id = assignment_stats.id;
      `);
    }
    async deleteRedunantData(queryRunner, samples, subjects, track) {
        const subjectIds = new Set(samples.map((s) => s.subject_id));
        const subjectsToDelete = subjects.filter((s) => !subjectIds.has(s.id) && s.track_id == track.id);
        if (subjectsToDelete.length === subjectIds.size) {
            console.log('No subjects to delete');
        }
        else {
            await queryRunner.manager.delete(subject_entity_1.SubjectEntity, subjectsToDelete);
        }
        const emptyStudentLPEnrollments = await queryRunner.manager
            .getRepository(student_enrollment_entity_1.StudentLPEnrollmentEntity)
            .createQueryBuilder('studentLPEnrollment')
            .leftJoin('studentLPEnrollment.samples', 'sample')
            .where('sample.id IS NULL')
            .getMany();
        if (emptyStudentLPEnrollments.length === 0) {
            console.log('No empty student LP enrollments to delete');
        }
        else {
            await queryRunner.manager.delete(student_enrollment_entity_1.StudentLPEnrollmentEntity, emptyStudentLPEnrollments);
        }
    }
}
exports.AddEliteData201746984777855 = AddEliteData201746984777855;
//# sourceMappingURL=201746984777855-AddEliteData.js.map