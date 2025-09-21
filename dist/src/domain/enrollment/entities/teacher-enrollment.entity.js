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
exports.TeacherEnrollmentEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../../core");
const student_enrollment_entity_1 = require("../../enrollment/entities/student-enrollment.entity");
const staff_entity_1 = require("../../staff/entities/staff.entity");
const academic_year_entity_1 = require("../../track/entities/academic-year.entity");
let TeacherEnrollmentEntity = class TeacherEnrollmentEntity extends core_1.IDGenericEntity {
};
exports.TeacherEnrollmentEntity = TeacherEnrollmentEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Teacher ID associated with this enrollment' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TeacherEnrollmentEntity.prototype, "teacher_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Academic year ID associated with this enrollment',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TeacherEnrollmentEntity.prototype, "academic_year_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Teacher associated with this enrollment',
        type: () => Object,
    }),
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.TeacherEntity, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'teacher_id' }),
    __metadata("design:type", Object)
], TeacherEnrollmentEntity.prototype, "teacher", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Academic year associated with this enrollment',
        type: () => academic_year_entity_1.AcademicYearEntity,
    }),
    (0, typeorm_1.ManyToOne)(() => academic_year_entity_1.AcademicYearEntity, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'academic_year_id' }),
    __metadata("design:type", Object)
], TeacherEnrollmentEntity.prototype, "academic_year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Assignment periods associated with this enrollment',
        type: () => [{}],
    }),
    (0, typeorm_1.ManyToMany)(() => student_enrollment_entity_1.StudentLPEnrollmentEntity, (student_lp_enrollment) => student_lp_enrollment.teacher_enrollments, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Object)
], TeacherEnrollmentEntity.prototype, "student_lp_enrollments", void 0);
exports.TeacherEnrollmentEntity = TeacherEnrollmentEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'teacher_enrollments' })
], TeacherEnrollmentEntity);
//# sourceMappingURL=teacher-enrollment.entity.js.map