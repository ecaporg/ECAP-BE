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
exports.StudentLPEnrollmentEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../core");
const teacher_enrollment_entity_1 = require("./teacher-enrollment.entity");
const sample_entity_1 = require("../../students/entities/sample.entity");
const student_entity_1 = require("../../students/entities/student.entity");
const track_entity_1 = require("../../track/entities/track.entity");
const track_learning_period_entity_1 = require("../../track/entities/track-learning-period.entity");
let StudentLPEnrollmentEntity = class StudentLPEnrollmentEntity extends core_1.GenericEntity {
};
exports.StudentLPEnrollmentEntity = StudentLPEnrollmentEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Teacher school year enrollment ID associated with this learning period',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StudentLPEnrollmentEntity.prototype, "teacher_school_year_enrollment_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Student ID associated with this learning period',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StudentLPEnrollmentEntity.prototype, "student_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Student grade', maxLength: 40 }),
    (0, typeorm_1.Column)({ length: 40, default: 'Unknown' }),
    __metadata("design:type", String)
], StudentLPEnrollmentEntity.prototype, "student_grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Learning period ID associated with this enrollment',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StudentLPEnrollmentEntity.prototype, "learning_period_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether this enrollment is completed' }),
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], StudentLPEnrollmentEntity.prototype, "completed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Percentage of completed samples' }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], StudentLPEnrollmentEntity.prototype, "percentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Track ID associated with this enrollment' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StudentLPEnrollmentEntity.prototype, "track_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Track associated with this enrollment' }),
    (0, typeorm_1.ManyToOne)(() => track_entity_1.TrackEntity, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'track_id' }),
    __metadata("design:type", track_entity_1.TrackEntity)
], StudentLPEnrollmentEntity.prototype, "track", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Learning period associated with this enrollment',
        type: () => track_learning_period_entity_1.TrackLearningPeriodEntity,
    }),
    (0, typeorm_1.ManyToOne)(() => track_learning_period_entity_1.TrackLearningPeriodEntity, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'learning_period_id' }),
    __metadata("design:type", track_learning_period_entity_1.TrackLearningPeriodEntity)
], StudentLPEnrollmentEntity.prototype, "learning_period", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Teacher school year enrollment associated with this enrollment',
        type: () => Object,
    }),
    (0, typeorm_1.ManyToOne)(() => teacher_enrollment_entity_1.TeacherSchoolYearEnrollmentEntity, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'teacher_school_year_enrollment_id' }),
    __metadata("design:type", teacher_enrollment_entity_1.TeacherSchoolYearEnrollmentEntity)
], StudentLPEnrollmentEntity.prototype, "teacher_school_year_enrollment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Student associated with this enrollment',
        type: () => student_entity_1.StudentEntity,
    }),
    (0, typeorm_1.ManyToOne)(() => student_entity_1.StudentEntity, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    __metadata("design:type", student_entity_1.StudentEntity)
], StudentLPEnrollmentEntity.prototype, "student", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Samples associated with this period',
        type: () => [{}],
    }),
    (0, typeorm_1.ManyToMany)(() => sample_entity_1.SampleEntity, (sample) => sample.student_lp_enrollments),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], StudentLPEnrollmentEntity.prototype, "samples", void 0);
exports.StudentLPEnrollmentEntity = StudentLPEnrollmentEntity = __decorate([
    (0, typeorm_1.Entity)('student_lp_enrollments')
], StudentLPEnrollmentEntity);
//# sourceMappingURL=student-enrollment.entity.js.map