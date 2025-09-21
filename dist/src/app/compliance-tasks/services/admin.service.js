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
exports.AdminComplianceService = void 0;
const common_1 = require("@nestjs/common");
const roles_enum_1 = require("../../../auth/enums/roles.enum");
const core_1 = require("../../../core");
const student_enrollment_assignment_service_1 = require("../../../domain/enrollment/services/student-enrollment-assignment.service");
const staff_service_1 = require("../../../domain/staff/services/staff.service");
const sample_entity_1 = require("../../../domain/students/entities/sample.entity");
const teacher_service_1 = require("./teacher.service");
let AdminComplianceService = class AdminComplianceService {
    constructor(studentLPEnrollmentAssignmentService, teacherComplianceTaskService, teacherService) {
        this.studentLPEnrollmentAssignmentService = studentLPEnrollmentAssignmentService;
        this.teacherComplianceTaskService = teacherComplianceTaskService;
        this.teacherService = teacherService;
    }
    async getTeachers(filters, user) {
        const completed = (0, core_1.getAndDeleteField)(filters, 'student_lp_enrollment.completed');
        const query = this.studentLPEnrollmentAssignmentService.getDefaultQuery({
            page: filters.page,
            limit: filters.limit,
        });
        const subQuery = this.studentLPEnrollmentAssignmentService
            .getRepository()
            .createQueryBuilder('assignments')
            .select([
            't_s_y_e.id as teacher_enrollment_id',
            'teacher.id as teacher_id',
            'user.name as teacher_name',
            'academy.id as academy_id',
            'academy.name as academy_name',
            'COUNT(DISTINCT student_lp_enrollment.student_id) as student_count',
            `COUNT(CASE WHEN sample.status = '${sample_entity_1.SampleStatus.COMPLETED}' THEN sample.id END) as completed_count`,
            `COUNT(CASE WHEN sample.flag_category IN ('${sample_entity_1.SampleFlagCategory.ERROR_IN_SAMPLE}', '${sample_entity_1.SampleFlagCategory.MISSING_SAMPLE}', '${sample_entity_1.SampleFlagCategory.REASON_REJECTED}') and sample.status <> '${sample_entity_1.SampleStatus.COMPLETED}' THEN sample.id END) as flagged_count`,
            `COUNT(CASE WHEN sample.status IN ('${sample_entity_1.SampleStatus.PENDING}', '${sample_entity_1.SampleStatus.ERRORS_FOUND}', '${sample_entity_1.SampleStatus.MISSING_SAMPLE}') THEN sample.id END) as incompleted_count`,
            `BOOL_AND(sample.status = '${sample_entity_1.SampleStatus.COMPLETED}') as is_complated`,
            `(COUNT(CASE WHEN sample.status = '${sample_entity_1.SampleStatus.COMPLETED}' THEN sample.id END)::float / COUNT(student_lp_enrollment.student_id)::float) * 100 as completion_percentage`,
        ])
            .leftJoin('assignments.student_lp_enrollment', 'student_lp_enrollment')
            .leftJoin('student_lp_enrollment.teacher_enrollments', 't_s_y_e')
            .leftJoin('t_s_y_e.teacher', 'teacher')
            .leftJoin('teacher.user', 'user')
            .leftJoin('t_s_y_e.academic_year', 'academic_year')
            .leftJoin('assignments.sample', 'sample')
            .leftJoin('student_lp_enrollment.student', 'student')
            .leftJoin('student.academy', 'academy')
            .groupBy('t_s_y_e.id')
            .addGroupBy('teacher.id')
            .addGroupBy('user.name')
            .addGroupBy('academy.id')
            .addGroupBy('academy.name')
            .orderBy((0, core_1.createOrderCondition)(filters.sortBy, filters.sortDirection));
        this.buildTeacherFilters(filters, user, subQuery);
        const [subQuerySql, subQueryParams] = subQuery.getQueryAndParameters();
        console.log('Generated subquery SQL:', subQuerySql);
        console.log('Query parameters:', subQueryParams);
        const completedQuery = completed && completed.length > 0
            ? `WHERE is_complated IN (${completed.join(',')})`
            : 'WHERE true';
        const sql = `
      WITH filtered_data AS (
        ${subQuerySql}
      )
      SELECT 
        *,
        (SELECT COUNT(*) FROM filtered_data ${completedQuery}) as total_rows,
        (SELECT COUNT(*) FROM filtered_data ${completedQuery} AND is_complated = true) as total_completed
      FROM filtered_data
      ${completedQuery}
      LIMIT ${query.take} OFFSET ${query.skip}
    `;
        const items = await this.studentLPEnrollmentAssignmentService
            .getRepository()
            .query(sql, subQueryParams);
        const totalItems = items[0]?.total_rows || 0;
        return {
            items,
            meta: {
                totalItems,
                itemCount: items.length,
                itemsPerPage: query.take,
                totalPages: Math.ceil(totalItems / query.take),
                currentPage: query.skip,
                additionalData: {
                    completedCount: filters?.['student_lp_enrollment.completed']?.every((item) => item === false)
                        ? 0
                        : items[0]?.total_completed,
                },
            },
        };
    }
    async getFilters(user) {
        return this.teacherComplianceTaskService.getFilters(user);
    }
    async searchTeachers(user, search) {
        const whereInSchool = {
            tenant: {
                [user.role === roles_enum_1.RolesEnum.DIRECTOR
                    ? 'directors'
                    : user.role === roles_enum_1.RolesEnum.ADMIN
                        ? 'admins'
                        : 'teachers']: {
                    user: {
                        id: user.id,
                    },
                },
            },
        };
        const teachers = await this.teacherService.findBy({
            where: this.teacherComplianceTaskService
                .getUserSearchFields(search)
                .map((property) => ({
                user: {
                    ...property,
                },
                ...whereInSchool,
            })),
            take: 10,
        });
        return teachers;
    }
    buildTeacherFilters(filters, user, query) {
        const academicYear = (0, core_1.getAndDeleteField)(filters, 'student_lp_enrollment.teacher_enrollments.academic_year_id');
        const learningPeriod = (0, core_1.getAndDeleteField)(filters, 'student_lp_enrollment.learning_period_id');
        const academy = (0, core_1.getAndDeleteField)(filters, 'student_lp_enrollment.student.academy_id');
        const school = (0, core_1.getAndDeleteField)(filters, 'student_lp_enrollment.student.school_id');
        const track = (0, core_1.getAndDeleteField)(filters, 'student_lp_enrollment.learning_period.track_id');
        const semesters = (0, core_1.getAndDeleteField)(filters, 'student_lp_enrollment.learning_period.track.semesters.id');
        const subject = (0, core_1.getAndDeleteField)(filters, 'assignment.course_id');
        const gradeSpan = (0, core_1.getAndDeleteField)(filters, 'student_lp_enrollment.student_grade');
        const status = (0, core_1.getAndDeleteField)(filters, 'sample.status');
        console.log('Applied filters:', {
            academicYear,
            learningPeriod,
            academy,
            school,
            track,
            semesters,
            subject,
            gradeSpan,
            status,
        });
        if (user.role === roles_enum_1.RolesEnum.DIRECTOR) {
            query.leftJoin('academy.directors', 'directors');
            query.andWhere('directors.id = :id', {
                id: user.id,
            });
        }
        else if (user.role === roles_enum_1.RolesEnum.ADMIN) {
            query.leftJoin('teacher.tenant', 'tenant');
            query.leftJoin('tenant.admins', 'admins');
            query.leftJoin('admins.user', 'admin_user');
            query.andWhere('admin_user.id = :id', {
                id: user.id,
            });
        }
        if (academicYear) {
            (0, core_1.addInOrEqualsCondition)(query, 't_s_y_e.academic_year_id', academicYear);
        }
        if (learningPeriod) {
            if (!track) {
                const [condition, params] = (0, core_1.formInOrEqualsCondition)('learning_period.id', learningPeriod);
                query.innerJoin('student_lp_enrollment.learning_period', 'learning_period', condition, params);
            }
            else {
                const [condition_1, params_1] = (0, core_1.formInOrEqualsCondition)('learning_period.id', learningPeriod, 'learning_period_ids');
                const [condition_2, params_2] = (0, core_1.formInOrEqualsCondition)('learning_period.track_id', track, 'track_ids');
                query.innerJoin('student_lp_enrollment.learning_period', 'learning_period', `${condition_1} AND ${condition_2}`, { ...params_1, ...params_2 });
            }
        }
        if (academy) {
            (0, core_1.addInOrEqualsCondition)(query, 'academy.id', academy);
        }
        if (school) {
            const [condition, params] = (0, core_1.formInOrEqualsCondition)('school.id', school);
            query.innerJoin('student.school', 'school', condition, params);
        }
        if (semesters) {
            query.leftJoin('learning_period.track', 'track');
            query.leftJoin('track.semesters', 'semesters');
            (0, core_1.addInOrEqualsCondition)(query, 'semesters.id', semesters);
        }
        if (subject) {
            query.leftJoin('assignments.assignment', 'assignment');
            (0, core_1.addInOrEqualsCondition)(query, 'assignment.course_id', subject);
        }
        if (gradeSpan) {
            (0, core_1.addInOrEqualsCondition)(query, 'student_lp_enrollment.student_grade', gradeSpan);
        }
        if (status) {
            (0, core_1.addInOrEqualsCondition)(query, 'sample.status', status);
        }
    }
};
exports.AdminComplianceService = AdminComplianceService;
exports.AdminComplianceService = AdminComplianceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [student_enrollment_assignment_service_1.StudentLPEnrollmentAssignmentService,
        teacher_service_1.TeacherComplianceTaskService,
        staff_service_1.TeacherService])
], AdminComplianceService);
//# sourceMappingURL=admin.service.js.map