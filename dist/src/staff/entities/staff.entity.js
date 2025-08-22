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
exports.DirectorEntity = exports.AdminEntity = exports.TeacherEntity = exports.StaffEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../core");
const teacher_enrollment_entity_1 = require("../../enrollment/entities/teacher-enrollment.entity");
const academy_entity_1 = require("../../school/entities/academy.entity");
const tenant_entity_1 = require("../../tenant/entities/tenant.entity");
const user_entity_1 = require("../../users/entities/user.entity");
class StaffEntity extends core_1.DatedGenericEntity {
}
exports.StaffEntity = StaffEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID associated with this staff member' }),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], StaffEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User associated with this staff member',
        type: () => user_entity_1.UserEntity,
    }),
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], StaffEntity.prototype, "user", void 0);
let TeacherEntity = class TeacherEntity extends StaffEntity {
};
exports.TeacherEntity = TeacherEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Teacher school year enrollments for this teacher',
        type: () => [{}],
    }),
    (0, typeorm_1.OneToMany)(() => teacher_enrollment_entity_1.TeacherSchoolYearEnrollmentEntity, (teacher_school_year_enrollment) => teacher_school_year_enrollment.teacher),
    __metadata("design:type", Array)
], TeacherEntity.prototype, "teacher_school_year_enrollments", void 0);
exports.TeacherEntity = TeacherEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'teachers' })
], TeacherEntity);
let AdminEntity = class AdminEntity extends StaffEntity {
};
exports.AdminEntity = AdminEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tenant ID associated with this admin/superadmin',
    }),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], AdminEntity.prototype, "tenant_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tenant associated with this admin/superadmin',
        type: () => tenant_entity_1.TenantEntity,
    }),
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.TenantEntity, (tenant) => tenant.admins, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'tenant_id' }),
    __metadata("design:type", tenant_entity_1.TenantEntity)
], AdminEntity.prototype, "tenant", void 0);
exports.AdminEntity = AdminEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'admins',
        comment: 'Admins and superadmins table',
    })
], AdminEntity);
let DirectorEntity = class DirectorEntity extends AdminEntity {
};
exports.DirectorEntity = DirectorEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Academy ID associated with this director' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DirectorEntity.prototype, "academy_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Academy associated with this director',
        type: () => Object,
    }),
    (0, typeorm_1.ManyToOne)(() => academy_entity_1.AcademyEntity, (academy) => academy.directors, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'academy_id' }),
    __metadata("design:type", academy_entity_1.AcademyEntity)
], DirectorEntity.prototype, "academy", void 0);
exports.DirectorEntity = DirectorEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'directors' })
], DirectorEntity);
//# sourceMappingURL=staff.entity.js.map