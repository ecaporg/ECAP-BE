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
exports.AcademicYearEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../core");
const teacher_enrollment_entity_1 = require("../../enrollment/entities/teacher-enrollment.entity");
const track_entity_1 = require("./track.entity");
let AcademicYearEntity = class AcademicYearEntity extends core_1.GenericEntity {
};
exports.AcademicYearEntity = AcademicYearEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start year of the academic year',
        type: 'integer',
    }),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], AcademicYearEntity.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End year of the academic year',
        type: 'integer',
    }),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], AcademicYearEntity.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tracks in this academic year',
        type: () => [{}],
    }),
    (0, typeorm_1.OneToMany)(() => track_entity_1.TrackEntity, (track) => track.academicYear),
    __metadata("design:type", Array)
], AcademicYearEntity.prototype, "tracks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Teacher school year enrollments in this academic year',
        type: () => [teacher_enrollment_entity_1.TeacherSchoolYearEnrollmentEntity],
    }),
    (0, typeorm_1.OneToMany)(() => teacher_enrollment_entity_1.TeacherSchoolYearEnrollmentEntity, (teacher_school_year_enrollment) => teacher_school_year_enrollment.academic_year),
    __metadata("design:type", Array)
], AcademicYearEntity.prototype, "teacher_school_year_enrollments", void 0);
exports.AcademicYearEntity = AcademicYearEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'academic_years' })
], AcademicYearEntity);
//# sourceMappingURL=academic-year.entity.js.map