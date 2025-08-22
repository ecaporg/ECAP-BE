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
const core_1 = require("../../core");
const student_enrollment_service_1 = require("../../enrollment/services/student-enrollment.service");
const staff_service_1 = require("../../staff/services/staff.service");
const sample_entity_1 = require("../../students/entities/sample.entity");
const roles_enum_1 = require("../../users/enums/roles.enum");
const teacher_service_1 = require("./teacher.service");
let AdminComplianceService = class AdminComplianceService {
    constructor(studentLPEnrollmentService, teacherComplianceTaskService, teacherService) {
        this.studentLPEnrollmentService = studentLPEnrollmentService;
        this.teacherComplianceTaskService = teacherComplianceTaskService;
        this.teacherService = teacherService;
    }
    async getTeachers(filters, user) {
        const semesters = filters['track.semesters.id'];
        const completed = filters['completed'];
        const subject = filters['samples.subject.id'];
        if (completed && completed.length > 0) {
            delete filters['completed'];
        }
        if (semesters && semesters.length > 0) {
            delete filters['track.semesters.id'];
        }
        if (subject && subject.length > 0) {
            delete filters['samples.subject.id'];
        }
        const paginationOptions = (0, core_1.extractPaginationOptions)(filters);
        const query = this.studentLPEnrollmentService.getDefaultQuery(paginationOptions);
        const subQuery = this.studentLPEnrollmentService
            .getRepository()
            .createQueryBuilder('student_lp_enrollments')
            .select([
            'student_lp_enrollments.teacher_school_year_enrollment_id as teacher_school_year_enrollment_id',
            'teacher.id as teacher_id',
            'user.name as teacher_name',
            'academy.id as academy_id',
            'academy.name as academy_name',
            'COUNT(DISTINCT student_lp_enrollments.student_id) as student_count',
            `COUNT(CASE WHEN samples.status = '${sample_entity_1.SampleStatus.COMPLETED}' THEN samples.id END) as completed_count`,
            `COUNT(CASE WHEN samples.flag_category IN ('${sample_entity_1.SampleFlagCategory.ERROR_IN_SAMPLE}', '${sample_entity_1.SampleFlagCategory.MISSING_SAMPLE}', '${sample_entity_1.SampleFlagCategory.REASON_REJECTED}') THEN samples.id END) as flagged_count`,
            `COUNT(CASE WHEN samples.status IN ('${sample_entity_1.SampleStatus.PENDING}', '${sample_entity_1.SampleStatus.ERRORS_FOUND}', '${sample_entity_1.SampleStatus.MISSING_SAMPLE}') THEN samples.id END) as incompleted_count`,
            `BOOL_AND(samples.status = '${sample_entity_1.SampleStatus.COMPLETED}') as is_complated`,
            `(COUNT(CASE WHEN samples.status = '${sample_entity_1.SampleStatus.COMPLETED}' THEN samples.id END)::float / COUNT(student_lp_enrollments.student_id)::float) * 100 as completion_percentage`,
        ])
            .leftJoin('student_lp_enrollments.teacher_school_year_enrollment', 'teacher_school_year_enrollment')
            .leftJoin('teacher_school_year_enrollment.teacher', 'teacher')
            .leftJoin('teacher.user', 'user')
            .leftJoin('teacher_school_year_enrollment.school', 'school')
            .leftJoin('teacher_school_year_enrollment.academic_year', 'academic_year')
            .leftJoin('student_lp_enrollments.samples', 'samples')
            .leftJoin('student_lp_enrollments.student', 'student')
            .leftJoin('student.academy', 'academy')
            .where(query.where)
            .groupBy('student_lp_enrollments.teacher_school_year_enrollment_id')
            .addGroupBy('teacher.id')
            .addGroupBy('user.name')
            .addGroupBy('academy.id')
            .addGroupBy('academy.name')
            .orderBy(query.order);
        if (user.role === roles_enum_1.RolesEnum.DIRECTOR) {
            subQuery.leftJoin('academy.directors', 'directors');
            subQuery.andWhere('directors.id = :id', {
                id: user.id,
            });
        }
        else if (user.role === roles_enum_1.RolesEnum.ADMIN) {
            subQuery.leftJoin('school.tenant', 'tenant');
            subQuery.leftJoin('tenant.admins', 'admins');
            subQuery.leftJoin('admins.user', 'admin_user');
            subQuery.andWhere('admin_user.id = :id', {
                id: user.id,
            });
        }
        if (semesters && semesters.length > 0) {
            subQuery.leftJoin('track', 'track');
            subQuery.leftJoin('track.semesters', 'semesters');
            subQuery.andWhere('semesters.id IN (:...ids)', {
                ids: semesters,
            });
        }
        if (subject && subject.length > 0) {
            subQuery.leftJoin('samples.subject', 'subject');
            subQuery.andWhere('subject.id IN (:...ids)', {
                ids: subject,
            });
        }
        const [subQuerySql, subQueryParams] = subQuery.getQueryAndParameters();
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
        const items = await this.studentLPEnrollmentService
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
                    completedCount: filters?.completed?.every((item) => item === false)
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
                [user.role === roles_enum_1.RolesEnum.DIRECTOR ? 'directors' : 'admins']: {
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
                teacher_school_year_enrollments: {
                    school: {
                        ...whereInSchool,
                    },
                },
            })),
            take: 10,
        });
        return teachers;
    }
};
exports.AdminComplianceService = AdminComplianceService;
exports.AdminComplianceService = AdminComplianceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [student_enrollment_service_1.StudentLPEnrollmentService,
        teacher_service_1.TeacherComplianceTaskService,
        staff_service_1.TeacherService])
], AdminComplianceService);
//# sourceMappingURL=admin.service.js.map