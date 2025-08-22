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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasEventProcessorService = exports.CanvasProcessorService = void 0;
const rxjs_1 = require("rxjs");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const core_1 = require("../../core");
const student_enrollment_service_1 = require("../../enrollment/services/student-enrollment.service");
const teacher_enrollment_service_1 = require("../../enrollment/services/teacher-enrollment.service");
const staff_service_1 = require("../../staff/services/staff.service");
const sample_entity_1 = require("../../students/entities/sample.entity");
const sample_service_1 = require("../../students/services/sample.service");
const student_service_1 = require("../../students/services/student.service");
const error_service_1 = require("../../tenant/services/error.service");
const tenant_service_1 = require("../../tenant/services/tenant.service");
const academic_year_service_1 = require("../../track/services/academic-year.service");
const subject_service_1 = require("../../track/services/subject.service");
const track_learning_period_service_1 = require("../../track/services/track-learning-period.service");
const roles_enum_1 = require("../../users/enums/roles.enum");
const users_service_1 = require("../../users/users.service");
const dto_1 = require("../dto");
const canvas_resources_service_1 = require("./canvas-resources.service");
class CanvasProcessorService {
    constructor(tenantService, studentService, academicYearService, userService, teacherService, canvasResourcesService, teacherSchoolYearEnrollmentService, learningPeriodService, subjectService, studentLPEnrollmentService, sampleService, errorService) {
        this.tenantService = tenantService;
        this.studentService = studentService;
        this.academicYearService = academicYearService;
        this.userService = userService;
        this.teacherService = teacherService;
        this.canvasResourcesService = canvasResourcesService;
        this.teacherSchoolYearEnrollmentService = teacherSchoolYearEnrollmentService;
        this.learningPeriodService = learningPeriodService;
        this.subjectService = subjectService;
        this.studentLPEnrollmentService = studentLPEnrollmentService;
        this.sampleService = sampleService;
        this.errorService = errorService;
    }
    async getAllData(event, key) {
        const enrollment = await (0, rxjs_1.firstValueFrom)(this.canvasResourcesService.fetchEnrollment(key, event.body.user_id, event.metadata.context_id));
        const assignment = await (0, rxjs_1.firstValueFrom)(this.canvasResourcesService.fetchAssignment(key, enrollment.course_id, event.body.assignment_id));
        const course = await (0, rxjs_1.firstValueFrom)(this.canvasResourcesService.fetchCourse(key, enrollment.course_id));
        const submission = await (0, rxjs_1.firstValueFrom)(this.canvasResourcesService.fetchSubmission(key, enrollment.course_id, event.body.assignment_id, event.body.user_id));
        const teachers = await (0, rxjs_1.firstValueFrom)(this.canvasResourcesService.fetchTeachersInCourse(key, enrollment.course_id));
        const user = await (0, rxjs_1.firstValueFrom)(this.canvasResourcesService.fetchUsersInAccount(key, event.metadata.user_account_id, event.metadata.user_id));
        return { enrollment, assignment, course, teachers, user, submission };
    }
    async getOrCreateTeachersEnrolemts(teachers, tenant, currentAcademicYear) {
        const setOfTeacherEnrolemts = new Map();
        const allTeacherEnrolemts = tenant.schools.flatMap((school) => school.teacher_school_year_enrollments);
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
                    ...(await this.createTeacherAndEnrolemt(teacher, tenant, currentAcademicYear)),
                ]);
            }
        }
        return Array.from(setOfTeacherEnrolemts.values()).flat();
    }
    async createTeacherAndEnrolemt(teacher, tenant, currentAcademicYear) {
        try {
            const user = await this.userService.findOneBy({
                email: teacher.email,
            }, {
                teacher: {
                    teacher_school_year_enrollments: true,
                },
            });
            if (user.teacher.teacher_school_year_enrollments.length > 0) {
                const schools = new Set(user.teacher.teacher_school_year_enrollments.map((enrolemt) => enrolemt.school_id));
                const newEnrolemts = Promise.all(tenant.schools
                    .filter((school) => schools.has(school.id))
                    .map((school) => this.teacherSchoolYearEnrollmentService.create({
                    school,
                    teacher: user.teacher,
                    academic_year: currentAcademicYear,
                })));
                return newEnrolemts;
            }
            else {
                const newTeacherEnrolemts = await Promise.all(tenant.schools.map((school) => this.teacherSchoolYearEnrollmentService.create({
                    school,
                    teacher: user.teacher,
                    academic_year: currentAcademicYear,
                })));
                return newTeacherEnrolemts;
            }
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
                const newTeacherEnrolemts = await Promise.all(tenant.schools.map((school) => this.teacherSchoolYearEnrollmentService.create({
                    school,
                    teacher: newTeacher,
                    academic_year: currentAcademicYear,
                })));
                return newTeacherEnrolemts;
            }
            else {
                throw error;
            }
        }
    }
    async getOrCreateStudent(person, tenant) {
        try {
            return await this.studentService.findOneBy({
                user: {
                    canvas_additional_info: {
                        canvas_id: person.id,
                    },
                },
            });
        }
        catch (error) {
            if (error instanceof core_1.NotFoundException) {
                const user = await this.userService.create({
                    email: person.email
                        ? `${person.id}+${person.email}`
                        : `${person.id}@test.com`,
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
                        track_name: null,
                        grade: -1,
                    },
                });
                const student = await this.studentService.create({
                    user,
                });
                await this.errorService.create({
                    tenant,
                    message: 'Create new student without academy, school, and track. JSON: ' +
                        JSON.stringify(user),
                });
                return student;
            }
            else {
                throw error;
            }
        }
    }
    async findSubjectWithLearningPeriod(assignment, course, tracks, student) {
        const subjects = await this.subjectService.findBy({
            where: {
                canvas_course_id: course.id.toString(),
                track: {
                    learningPeriods: {
                        start_date: (0, typeorm_1.LessThanOrEqual)(new Date(assignment.due_at)),
                        end_date: (0, typeorm_1.MoreThanOrEqual)(new Date(assignment.due_at)),
                    },
                },
            },
            relations: {
                track: {
                    learningPeriods: true,
                },
            },
        });
        if (subjects.length === 0) {
            await this.subjectService.create({
                name: course.name
                    .replaceAll(/\b\d{0,2}[ABKX]\b/g, '')
                    .replaceAll('Flex', '')
                    .trim(),
                track: tracks.find((track) => student.user.canvas_additional_info.track_name
                    ? track.name === student.user.canvas_additional_info.track_name
                    : true),
                canvas_course_id: course.id.toString(),
                canvas_additional_info: {
                    account_id: course.account_id,
                    course_code: course.course_code,
                    enrollment_term_id: course.enrollment_term_id,
                    uuid: course.uuid,
                },
            });
            return this.findSubjectWithLearningPeriod(assignment, course, tracks, student);
        }
        return subjects.map((subject) => ({
            ...subject,
            track: {
                ...subject.track,
                learningPeriods: subject.track.learningPeriods.filter((learning_period) => new Date(learning_period.start_date) <=
                    new Date(assignment.due_at) &&
                    new Date(learning_period.end_date) >= new Date(assignment.due_at)),
            },
        }));
    }
    async getOrCreateStudentEnrolemts(student, learning_periods, teacher_enrolemts) {
        const student_enrolemts = await this.studentLPEnrollmentService.findBy({
            where: {
                student,
                learning_period: (0, typeorm_1.In)(learning_periods.map((learning_period) => learning_period.id)),
                teacher_school_year_enrollment_id: (0, typeorm_1.In)(teacher_enrolemts.map((enrolemt) => enrolemt.id)),
            },
        });
        if (student_enrolemts.length === 0) {
            return await Promise.all(teacher_enrolemts.flatMap((enrolemt) => learning_periods.map((learning_period) => this.studentLPEnrollmentService.create({
                student,
                learning_period,
                teacher_school_year_enrollment: enrolemt,
                completed: false,
                track_id: learning_period.track_id,
            }))));
        }
        return student_enrolemts;
    }
    async createSamples(student_enrolemts, subjects, assignment, submission, teacher) {
        const status = submission.missing || submission.workflow_state === 'unsubmitted'
            ? sample_entity_1.SampleStatus.MISSING_SAMPLE
            : !submission.grade || !assignment?.name
                ? sample_entity_1.SampleStatus.ERRORS_FOUND
                : submission.workflow_state === 'graded'
                    ? sample_entity_1.SampleStatus.COMPLETED
                    : sample_entity_1.SampleStatus.PENDING;
        return {
            assignment_title: assignment?.name,
            grade: submission.grade,
            date: submission.submitted_at
                ? new Date(submission.submitted_at)
                : undefined,
            status,
            subject: subjects[0],
            preview_url: submission.preview_url,
            student_lp_enrollments: student_enrolemts,
            canvas_submission_id: submission.id ? Number(submission.id) : undefined,
            done_by_id: status == sample_entity_1.SampleStatus.COMPLETED ? teacher.id : undefined,
        };
    }
    async updateSample(submission, assignment, teachers) {
        const sample = await this.sampleService.findOneBy({
            canvas_submission_id: submission.id ? Number(submission.id) : undefined,
        });
        sample.status =
            submission.missing || submission.workflow_state === 'unsubmitted'
                ? sample_entity_1.SampleStatus.MISSING_SAMPLE
                : !submission.grade || !assignment?.name
                    ? sample_entity_1.SampleStatus.ERRORS_FOUND
                    : submission.workflow_state === 'graded'
                        ? sample_entity_1.SampleStatus.COMPLETED
                        : sample_entity_1.SampleStatus.PENDING;
        sample.assignment_title = assignment?.name;
        sample.grade = submission.grade;
        sample.date = submission.submitted_at
            ? new Date(submission.submitted_at)
            : undefined;
        sample.preview_url = submission.preview_url;
        if (!sample.done_by_id && sample.status == sample_entity_1.SampleStatus.COMPLETED) {
            const teacherDto = teachers.find((teacher) => teacher.id == submission.user_id);
            if (teacherDto) {
                const teacher = await this.teacherService.findOneBy({
                    user: {
                        email: teacherDto.email,
                    },
                });
                sample.done_by_id = teacher ? teacher.id : undefined;
            }
        }
        return this.sampleService.save(sample);
    }
    async findTenantByRootAccountId(rootAccountId) {
        const currentAcademicYear = await this.academicYearService.findCurrentAcademicYears();
        const tenant = await this.tenantService.findOneBy({
            root_id: Number(rootAccountId),
            schools: {
                teacher_school_year_enrollments: {
                    academic_year: {
                        id: currentAcademicYear[0].id,
                    },
                },
            },
            tracks: {
                academic_year_id: currentAcademicYear[0].id,
            },
        }, {
            key: true,
            schools: {
                teacher_school_year_enrollments: {
                    teacher: {
                        user: true,
                    },
                    academic_year: true,
                },
            },
            tracks: {
                learningPeriods: true,
            },
        });
        return { tenant, currentAcademicYear: currentAcademicYear[0] };
    }
}
exports.CanvasProcessorService = CanvasProcessorService;
let CanvasEventProcessorService = class CanvasEventProcessorService extends CanvasProcessorService {
    constructor(tenantService, studentService, academicYearService, userService, teacherService, canvasResourcesService, teacherSchoolYearEnrollmentService, learningPeriodService, subjectService, studentLPEnrollmentService, sampleService, errorService) {
        super(tenantService, studentService, academicYearService, userService, teacherService, canvasResourcesService, teacherSchoolYearEnrollmentService, learningPeriodService, subjectService, studentLPEnrollmentService, sampleService, errorService);
        this.tenantService = tenantService;
        this.studentService = studentService;
        this.academicYearService = academicYearService;
        this.userService = userService;
        this.teacherService = teacherService;
        this.canvasResourcesService = canvasResourcesService;
        this.teacherSchoolYearEnrollmentService = teacherSchoolYearEnrollmentService;
        this.learningPeriodService = learningPeriodService;
        this.subjectService = subjectService;
        this.studentLPEnrollmentService = studentLPEnrollmentService;
        this.sampleService = sampleService;
        this.errorService = errorService;
    }
    async processCanvasEvent(event) {
        const { tenant, currentAcademicYear } = await this.findTenantByRootAccountId('1');
        try {
            await this.handleEventByType(event, tenant, currentAcademicYear);
        }
        catch (error) {
            this.errorService.create({
                tenant,
                message: `Error processing canvas event: ${error.message}, event: ${JSON.stringify(event)}`,
            });
            throw error;
        }
    }
    async handleEventByType(event, tenant, currentAcademicYear) {
        switch (event.metadata.event_name) {
            case dto_1.CanvasEventType.SUBMISSION_CREATED:
                await this.handleSubmissionCreated(event, tenant, currentAcademicYear);
                break;
            case dto_1.CanvasEventType.SUBMISSION_UPDATED:
                await this.handleSubmissionUpdated(event, tenant);
                break;
        }
    }
    async handleSubmissionCreated(event, tenant, currentAcademicYear) {
        const { assignment, course, teachers, user, submission } = await this.getAllData(event, tenant.key);
        const teacher_enrolemts = await this.getOrCreateTeachersEnrolemts(teachers, tenant, currentAcademicYear);
        const student = await this.getOrCreateStudent(user[0], tenant);
        const subjects = await this.findSubjectWithLearningPeriod(assignment, course, tenant.tracks, student);
        const student_enrolemts = await this.getOrCreateStudentEnrolemts(student, subjects.flatMap((subject) => subject.track.learningPeriods), teacher_enrolemts);
        await this.createSamples(student_enrolemts, subjects, assignment, submission, teacher_enrolemts[0].teacher);
    }
    async handleSubmissionUpdated(event, tenant) {
        const { submission, assignment, teachers } = await this.getAllData(event, tenant.key);
        await this.updateSample(submission, assignment, teachers);
    }
};
exports.CanvasEventProcessorService = CanvasEventProcessorService;
exports.CanvasEventProcessorService = CanvasEventProcessorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_service_1.TenantService,
        student_service_1.StudentService,
        academic_year_service_1.AcademicYearService,
        users_service_1.UsersService,
        staff_service_1.TeacherService,
        canvas_resources_service_1.CanvasResourcesService,
        teacher_enrollment_service_1.TeacherSchoolYearEnrollmentService,
        track_learning_period_service_1.TrackLearningPeriodService,
        subject_service_1.SubjectService,
        student_enrollment_service_1.StudentLPEnrollmentService,
        sample_service_1.SampleService,
        error_service_1.ErrorService])
], CanvasEventProcessorService);
//# sourceMappingURL=canvas-event-processor.service.js.map