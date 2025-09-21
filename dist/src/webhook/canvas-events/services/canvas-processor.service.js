"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CanvasProcessorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasProcessorService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const roles_enum_1 = require("../../../auth/enums/roles.enum");
const users_service_1 = require("../../../auth/services/users.service");
const core_1 = require("../../../core");
const student_enrollment_service_1 = require("../../../domain/enrollment/services/student-enrollment.service");
const student_enrollment_assignment_service_1 = require("../../../domain/enrollment/services/student-enrollment-assignment.service");
const teacher_enrollment_service_1 = require("../../../domain/enrollment/services/teacher-enrollment.service");
const staff_service_1 = require("../../../domain/staff/services/staff.service");
const sample_entity_1 = require("../../../domain/students/entities/sample.entity");
const sample_service_1 = require("../../../domain/students/services/sample.service");
const student_service_1 = require("../../../domain/students/services/student.service");
const assignment_service_1 = require("../../../domain/subject/services/assignment.service");
const course_service_1 = require("../../../domain/subject/services/course.service");
const tenant_service_1 = require("../../../domain/tenant/services/tenant.service");
const academic_year_service_1 = require("../../../domain/track/services/academic-year.service");
let CanvasProcessorService = CanvasProcessorService_1 = class CanvasProcessorService {
    constructor(tenantService, studentService, academicYearService, userService, teacherService, teacherEnrollmentService, studentLPEnrollmentService, studentLPEnrollmentAssignmentService, sampleService, courseService, courseAssignmentService) {
        this.tenantService = tenantService;
        this.studentService = studentService;
        this.academicYearService = academicYearService;
        this.userService = userService;
        this.teacherService = teacherService;
        this.teacherEnrollmentService = teacherEnrollmentService;
        this.studentLPEnrollmentService = studentLPEnrollmentService;
        this.studentLPEnrollmentAssignmentService = studentLPEnrollmentAssignmentService;
        this.sampleService = sampleService;
        this.courseService = courseService;
        this.courseAssignmentService = courseAssignmentService;
        this.logger = new common_1.Logger(CanvasProcessorService_1.name);
    }
    async updateCourse(data) {
        let course = await this.courseService
            .findOneBy({
            canvas_id: data.course.id.toString(),
        }, {
            assignments: true,
        })
            .catch(() => null);
        const [assignments, learningPeriods] = this.filterAssignmentsWithDueDate(data.tenant.tracks.flatMap((track) => track.learningPeriods.map((lp) => ({ ...lp, track }))), data.assignments, data.course);
        if (course && course.assignments && course.assignments.length > 0) {
            this.courseService.save({
                ...course,
                name: data.course.name,
            });
        }
        else if (course) {
            course = await this.courseService.save({
                ...course,
                name: data.course.name,
                assignments: assignments.map((assignment) => ({
                    canvas_id: assignment.id.toString(),
                    name: assignment.name,
                    due_at: assignment.due_at,
                })),
            });
        }
        else {
            course = await this.courseService.create({
                canvas_id: data.course.id.toString(),
                name: data.course.name,
                assignments: assignments.map((assignment) => ({
                    canvas_id: assignment.id.toString(),
                    name: assignment.name,
                    due_at: assignment.due_at,
                })),
                tenant: data.tenant,
            });
        }
        const filteredTeachers = await this.getOrCreateTeachersEnrolemts(data.teachers, data.tenant, data.currentAcademicYear);
        await this.createStudentLPEnrollments(course, assignments, learningPeriods, data.students, filteredTeachers, data.tenant.schools[0]);
    }
    async updateAssignment(tenant, assignment) {
        const assignments = await this.courseAssignmentService
            .findOneBy({
            canvas_id: assignment.id.toString(),
        })
            .catch(() => null);
        if (assignments) {
            return this.courseAssignmentService.save({
                ...assignments,
                name: assignment.name,
            });
        }
        if (!this.isAssignmentValid(assignment))
            return null;
    }
    async updateSubmission(data) {
        const sample = await this.sampleService
            .findOneBy({
            canvas_id: data.submission.id.toString(),
        })
            .catch(() => null);
        if (sample) {
            return await this.updateSample(sample, data.submission, data.assignment, data.teachers);
        }
        const student_lp_enrollment_assignment = await this.studentLPEnrollmentAssignmentService
            .findOneBy({
            student_lp_enrollment: {
                student: {
                    user: {
                        email: data.user.email,
                    },
                },
            },
            assignment: {
                canvas_id: data.assignment.id.toString(),
            },
        })
            .catch(() => null);
        if (!student_lp_enrollment_assignment) {
            return;
        }
        return await this.updateSample({
            student_lp_enrollment_assignment: student_lp_enrollment_assignment,
            canvas_id: data.submission.id.toString(),
        }, data.submission, data.assignment, data.teachers);
    }
    filterAssignmentsWithDueDate(learning_periods, assignments, course) {
        const courseTrackMatch = course.name.match(/\b\d*([A-C])\b|[\(\[]([A-C])[\)\]]/);
        const trackLetter = courseTrackMatch
            ? courseTrackMatch[1] || courseTrackMatch[2]
            : 'A';
        const filteredLearningPeriods = learning_periods.filter((lp) => lp.track.name.match(new RegExp(`\\b\\d*${trackLetter}\\b|[\\(\\[]${trackLetter}[\\)\\]]`, 'g')));
        assignments = assignments.filter(this.isAssignmentValid).sort((a, b) => {
            return new Date(b.due_at).getTime() - new Date(a.due_at).getTime();
        });
        const twoAssignmentsPerPeriodPerCourse = [];
        const usedLPs = [];
        for (const period of filteredLearningPeriods) {
            const firstAssignment = assignments.find((assignment) => {
                return new Date(assignment.due_at) <= new Date(period.end_date);
            });
            const secondAssignment = assignments.find((assignment) => {
                return (new Date(assignment.due_at) <= new Date(period.end_date) &&
                    assignment.id !== firstAssignment?.id);
            });
            if (!firstAssignment || !secondAssignment) {
                continue;
            }
            firstAssignment['learning_period'] = period;
            secondAssignment['learning_period'] = period;
            usedLPs.push(period);
            twoAssignmentsPerPeriodPerCourse.push(firstAssignment, secondAssignment);
        }
        return [twoAssignmentsPerPeriodPerCourse.filter(Boolean), usedLPs];
    }
    async getOrCreateTeachersEnrolemts(teachers, tenant, currentAcademicYear) {
        const setOfTeacherEnrolemts = new Map();
        const allTeacherEnrolemts = tenant.teachers.flatMap((teacher) => teacher.teacher_enrollments.map((enrolemnt) => ({
            ...enrolemnt,
            teacher,
        })));
        for (const teacher of teachers) {
            const teacherEnrolemt = allTeacherEnrolemts.filter((teacherEnrolemt) => teacherEnrolemt.teacher.user.email == teacher.email);
            if (teacherEnrolemt.length > 0) {
                setOfTeacherEnrolemts.set(teacher.id, [
                    ...(setOfTeacherEnrolemts.get(teacher.id) || []),
                    ...teacherEnrolemt,
                ]);
            }
            else {
                setOfTeacherEnrolemts.set(teacher.id, [
                    ...(setOfTeacherEnrolemts.get(teacher.id) || []),
                    await this.createTeacherAndEnrollment(teacher, tenant, currentAcademicYear),
                ]);
            }
        }
        return Array.from(setOfTeacherEnrolemts.values()).flat();
    }
    async createTeacherAndEnrollment(teacher, tenant, currentAcademicYear) {
        try {
            const user = await this.userService.findOneBy({
                email: teacher.email,
            }, {
                teacher: {
                    teacher_enrollments: true,
                },
            });
            const newEnrollment = await this.teacherEnrollmentService.create({
                teacher: user.teacher,
                academic_year: currentAcademicYear,
            });
            return newEnrollment;
        }
        catch (error) {
            if (error instanceof core_1.NotFoundException) {
                const user = await this.userService.create({
                    email: teacher.email,
                    password: '',
                    name: teacher.name,
                    isActive: true,
                    emailVerified: true,
                    role: roles_enum_1.RolesEnum.TEACHER,
                    canvas_additional_info: {
                        canvas_id: teacher.id,
                        avatar_url: teacher.avatar_url,
                        time_zone: teacher.time_zone,
                    },
                });
                const newTeacher = await this.teacherService.create({
                    user,
                });
                const newEnrollment = await this.teacherEnrollmentService.create({
                    teacher: newTeacher,
                    academic_year: currentAcademicYear,
                });
                return newEnrollment;
            }
            else {
                throw error;
            }
        }
    }
    async createStudentLPEnrollments(course, canvasAssignments, learningPeriods, students, teacher_school_enrollment, defaultSchool) {
        const studentLPEnrollmentPeriods = [];
        const studentLPEnrollmentAssignments = [];
        const db_students = await this.getAndCreateStudents(students, defaultSchool.id);
        for (const person of students) {
            const student = db_students.find((s) => s.user.email === person.email);
            if (!student)
                continue;
            for (const learningPeriod of learningPeriods) {
                const assignments = course.assignments
                    .filter((assignment) => canvasAssignments.find((a) => a.id.toString() === assignment.canvas_id)?.['learning_period']?.id === learningPeriod.id)
                    .map((assignment) => ({ assignment }));
                if (assignments.length === 0)
                    continue;
                const currentLPEnrollment = student.student_lp_enrollments.find((enrollment) => enrollment.learning_period_id == learningPeriod.id);
                if (currentLPEnrollment) {
                    assignments.forEach((a) => {
                        if (!currentLPEnrollment.assignments.find((existing) => existing.assignment_id == a.assignment.id))
                            studentLPEnrollmentAssignments.push({
                                ...a,
                                student_lp_enrollment: currentLPEnrollment,
                            });
                    });
                }
                else {
                    studentLPEnrollmentPeriods.push({
                        student,
                        learning_period: learningPeriod,
                        completed: false,
                        percentage: 0,
                        student_grade: `Grade ${student.user.canvas_additional_info.grade}`,
                        teacher_enrollments: teacher_school_enrollment,
                        assignments: assignments,
                    });
                }
            }
        }
        await this.studentLPEnrollmentService.bulkCreate(studentLPEnrollmentPeriods);
        await this.studentLPEnrollmentAssignmentService.bulkCreate(studentLPEnrollmentAssignments);
    }
    async getAndCreateStudents(students, school_id) {
        const db_students = await this.studentService.findBy({
            where: {
                user: {
                    email: (0, typeorm_1.In)(students.map((student) => student.email)),
                },
            },
            relations: {
                student_lp_enrollments: {
                    assignments: true,
                },
                user: true,
            },
        });
        const newStudents = students.filter((student) => !db_students.some((s) => s.user.email === student.email));
        const createdStudents = await this.studentService.bulkCreate(newStudents
            .filter((person) => person.email)
            .map((person) => this.createStudent(person, school_id)));
        return [...db_students, ...createdStudents];
    }
    createStudent(person, school_id) {
        const user = {
            email: person.email,
            password: '',
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
                track_name: `Track A`,
                grade: -1,
            },
        };
        const student = {
            user,
            school_id,
        };
        return student;
    }
    async updateSample(sample, submission, assignment, teachers) {
        sample.status =
            submission.missing || submission.workflow_state === 'unsubmitted'
                ? sample_entity_1.SampleStatus.MISSING_SAMPLE
                : !submission.grade || !assignment?.name
                    ? sample_entity_1.SampleStatus.ERRORS_FOUND
                    : submission.workflow_state === 'graded'
                        ? sample_entity_1.SampleStatus.COMPLETED
                        : sample_entity_1.SampleStatus.PENDING;
        sample.grade = submission.grade;
        sample.date = submission.submitted_at
            ? new Date(submission.submitted_at)
            : undefined;
        sample.preview_url = submission.preview_url;
        if (!sample.done_by_id && sample.status == sample_entity_1.SampleStatus.COMPLETED) {
            const teacherDto = teachers.find((teacher) => teacher.id == submission.user_id);
            if (teacherDto) {
                const teacher = await this.userService
                    .findOneBy({
                    email: teacherDto.email,
                })
                    .catch(() => null);
                sample.done_by_id = teacher ? teacher.id : undefined;
            }
        }
        else if (sample.status === sample_entity_1.SampleStatus.ERRORS_FOUND &&
            !sample.flag_errors) {
            sample.flag_errors = {
                comment: 'Errors found in work sample',
            };
        }
        else if (sample.status === sample_entity_1.SampleStatus.MISSING_SAMPLE &&
            !sample.flag_missing_work) {
            sample.flag_missing_work = {
                reason: 'Missing work',
            };
        }
        return this.sampleService.save(sample);
    }
    async findTenantByDomain(domain) {
        try {
            const currentAcademicYear = await this.academicYearService.findCurrentAcademicYears();
            const tenant = await this.tenantService.findOneBy({
                teachers: {
                    teacher_enrollments: {
                        academic_year: {
                            id: currentAcademicYear[0].id,
                        },
                    },
                },
                tracks: {
                    academic_year_id: currentAcademicYear[0].id,
                },
                key: {
                    url: (0, typeorm_1.ILike)(`%${domain}%`),
                },
            }, {
                key: true,
                schools: true,
                teachers: {
                    teacher_enrollments: {
                        academic_year: true,
                    },
                    user: true,
                },
                tracks: {
                    learningPeriods: true,
                },
            });
            return { tenant, currentAcademicYear: currentAcademicYear[0] };
        }
        catch (error) {
            return {
                tenant: null,
                currentAcademicYear: null,
            };
        }
    }
    async logError({ domain, event, error }) {
        const errorMessage = `Error processing canvas event: domain ${domain}, error: ${error.message}, event: ${JSON.stringify(event)}`;
        this.logger.error(errorMessage);
    }
    isAssignmentValid(assignment) {
        return (!!assignment.due_at &&
            assignment.published &&
            !assignment.anonymize_students &&
            !assignment.anonymous_submissions);
    }
    async processEnrollmentCreated(data) {
        return this.updateCourse(data);
    }
    async handleCourseDeletion(tenant, course) {
        return this.courseService.delete({
            canvas_id: course.id.toString(),
            tenant_id: tenant.id,
        });
    }
    async checkAssignment(id) {
        return this.courseAssignmentService
            .createBuilderQuery('course_assignment')
            .where(":id ILIKE CONCAT('%', canvas_id, '%')", { id: id.toString() })
            .getOne()
            .catch(() => null);
    }
};
exports.CanvasProcessorService = CanvasProcessorService;
exports.CanvasProcessorService = CanvasProcessorService = CanvasProcessorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_service_1.TenantService,
        student_service_1.StudentService,
        academic_year_service_1.AcademicYearService,
        users_service_1.UsersService,
        staff_service_1.TeacherService,
        teacher_enrollment_service_1.TeacherEnrollmentService,
        student_enrollment_service_1.StudentLPEnrollmentService,
        student_enrollment_assignment_service_1.StudentLPEnrollmentAssignmentService,
        sample_service_1.SampleService,
        course_service_1.CourseService,
        assignment_service_1.CourseAssignmentService])
], CanvasProcessorService);
//# sourceMappingURL=canvas-processor.service.js.map