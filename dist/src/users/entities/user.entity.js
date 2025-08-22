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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../core");
const staff_entity_1 = require("../../staff/entities/staff.entity");
const staff_entity_2 = require("../../staff/entities/staff.entity");
const student_entity_1 = require("../../students/entities/student.entity");
const roles_enum_1 = require("../enums/roles.enum");
let UserEntity = class UserEntity extends core_1.GenericEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User email address', uniqueItems: true }),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User name' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User password (hashed)' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the user account is active',
        default: true,
    }),
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the user email is verified',
        default: false,
    }),
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "emailVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User refresh token', nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User role', enum: roles_enum_1.RolesEnum, nullable: true }),
    (0, typeorm_1.Column)({ nullable: true, enum: roles_enum_1.RolesEnum }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional information such as SIS user id, SIS import id, etc.',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "canvas_additional_info", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Student profiles associated with this user',
        type: () => [{}],
    }),
    (0, typeorm_1.OneToOne)(() => student_entity_1.StudentEntity, (student) => student.user),
    __metadata("design:type", student_entity_1.StudentEntity)
], UserEntity.prototype, "student", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Teacher profiles associated with this user',
        type: () => [{}],
    }),
    (0, typeorm_1.OneToOne)(() => staff_entity_1.TeacherEntity, (teacher) => teacher.user),
    __metadata("design:type", staff_entity_1.TeacherEntity)
], UserEntity.prototype, "teacher", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Director profiles associated with this user',
        type: () => [{}],
    }),
    (0, typeorm_1.OneToOne)(() => staff_entity_2.DirectorEntity, (director) => director.user),
    __metadata("design:type", staff_entity_2.DirectorEntity)
], UserEntity.prototype, "director", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Admin profiles associated with this user',
        type: () => [{}],
    }),
    (0, typeorm_1.OneToOne)(() => staff_entity_1.AdminEntity, (admin) => admin.user),
    __metadata("design:type", staff_entity_1.AdminEntity)
], UserEntity.prototype, "admin", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], UserEntity);
//# sourceMappingURL=user.entity.js.map