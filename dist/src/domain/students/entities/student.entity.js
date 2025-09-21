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
exports.StudentEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../../auth/entities/user.entity");
const core_1 = require("../../../core");
const student_enrollment_entity_1 = require("../../enrollment/entities/student-enrollment.entity");
const academy_entity_1 = require("../../school/entities/academy.entity");
const school_entity_1 = require("../../school/entities/school.entity");
let StudentEntity = class StudentEntity extends core_1.IDIntGenericEntity {
};
exports.StudentEntity = StudentEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID associated with this student' }),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], StudentEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'School ID associated with this student' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], StudentEntity.prototype, "school_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Academy ID associated with this student',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], StudentEntity.prototype, "academy_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'School associated with this student',
        type: () => Object,
    }),
    (0, typeorm_1.ManyToOne)(() => school_entity_1.SchoolEntity, (school) => school.students, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'school_id' }),
    __metadata("design:type", Object)
], StudentEntity.prototype, "school", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User associated with this student',
        type: () => user_entity_1.UserEntity,
    }),
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: ['insert'],
    }),
    (0, typeorm_1.JoinColumn)({ name: 'id' }),
    __metadata("design:type", Object)
], StudentEntity.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Academy associated with this student',
        type: () => Object,
    }),
    (0, typeorm_1.ManyToOne)(() => academy_entity_1.AcademyEntity, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'academy_id' }),
    __metadata("design:type", Object)
], StudentEntity.prototype, "academy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Assignment periods for this student',
        type: () => [{}],
    }),
    (0, typeorm_1.OneToMany)(() => student_enrollment_entity_1.StudentLPEnrollmentEntity, (student_lp_enrollment) => student_lp_enrollment.student),
    __metadata("design:type", Object)
], StudentEntity.prototype, "student_lp_enrollments", void 0);
exports.StudentEntity = StudentEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'students' })
], StudentEntity);
//# sourceMappingURL=student.entity.js.map