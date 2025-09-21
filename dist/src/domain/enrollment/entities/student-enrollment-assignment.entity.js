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
exports.StudentLPEnrollmentAssignmentEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const assignment_entity_1 = require("../../../domain/subject/entities/assignment.entity");
const sample_entity_1 = require("../../students/entities/sample.entity");
const student_enrollment_entity_1 = require("./student-enrollment.entity");
let StudentLPEnrollmentAssignmentEntity = class StudentLPEnrollmentAssignmentEntity {
};
exports.StudentLPEnrollmentAssignmentEntity = StudentLPEnrollmentAssignmentEntity;
__decorate([
    (0, typeorm_1.VirtualColumn)('string', {
        query: (alias) => `CONCAT(${alias}.student_lp_enrollment_id, '-', ${alias}.assignment_id)`,
    }),
    __metadata("design:type", String)
], StudentLPEnrollmentAssignmentEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Student learning plan enrollment ID associated with this assignment',
    }),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], StudentLPEnrollmentAssignmentEntity.prototype, "student_lp_enrollment_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Assignment ID associated with this learning period',
    }),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], StudentLPEnrollmentAssignmentEntity.prototype, "assignment_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sample ID associated with this assignment',
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], StudentLPEnrollmentAssignmentEntity.prototype, "sample_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assignment associated with this enrollment' }),
    (0, typeorm_1.ManyToOne)(() => assignment_entity_1.AssignmentEntity, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'assignment_id' }),
    __metadata("design:type", Object)
], StudentLPEnrollmentAssignmentEntity.prototype, "assignment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sample associated with this enrollment',
        type: () => sample_entity_1.SampleEntity,
    }),
    (0, typeorm_1.OneToOne)(() => sample_entity_1.SampleEntity, {
        cascade: ['insert'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'sample_id' }),
    __metadata("design:type", Object)
], StudentLPEnrollmentAssignmentEntity.prototype, "sample", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Student learning plan enrollment associated with this assignment',
        type: () => student_enrollment_entity_1.StudentLPEnrollmentEntity,
    }),
    (0, typeorm_1.ManyToOne)(() => student_enrollment_entity_1.StudentLPEnrollmentEntity, {}),
    (0, typeorm_1.JoinColumn)({ name: 'student_lp_enrollment_id' }),
    __metadata("design:type", Object)
], StudentLPEnrollmentAssignmentEntity.prototype, "student_lp_enrollment", void 0);
exports.StudentLPEnrollmentAssignmentEntity = StudentLPEnrollmentAssignmentEntity = __decorate([
    (0, typeorm_1.Entity)('student_lp_enrollment_assignments')
], StudentLPEnrollmentAssignmentEntity);
//# sourceMappingURL=student-enrollment-assignment.entity.js.map