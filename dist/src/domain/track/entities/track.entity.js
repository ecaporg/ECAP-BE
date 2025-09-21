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
exports.TrackEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../../core");
const tenant_entity_1 = require("../../tenant/entities/tenant.entity");
const academic_year_entity_1 = require("./academic-year.entity");
const semester_entity_1 = require("./semester.entity");
const track_calendar_entity_1 = require("./track-calendar.entity");
const track_learning_period_entity_1 = require("./track-learning-period.entity");
let TrackEntity = class TrackEntity extends core_1.TenantGenericEntity {
};
exports.TrackEntity = TrackEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Track name', maxLength: 250 }),
    (0, typeorm_1.Column)({ length: 250 }),
    __metadata("design:type", String)
], TrackEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Track start date' }),
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], TrackEntity.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Track end date' }),
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], TrackEntity.prototype, "end_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Academic year ID associated with this track',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TrackEntity.prototype, "academic_year_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tenant associated with this track',
        type: () => tenant_entity_1.TenantEntity,
    }),
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.TenantEntity, (tenant) => tenant.tracks, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'tenant_id' }),
    __metadata("design:type", Object)
], TrackEntity.prototype, "tenant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Academic year associated with this track',
        type: () => academic_year_entity_1.AcademicYearEntity,
    }),
    (0, typeorm_1.ManyToOne)(() => academic_year_entity_1.AcademicYearEntity, (academicYear) => academicYear.tracks, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'academic_year_id' }),
    __metadata("design:type", Object)
], TrackEntity.prototype, "academicYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Calendar entries for this track',
        type: () => track_calendar_entity_1.TrackCalendarEntity,
    }),
    (0, typeorm_1.OneToOne)(() => track_calendar_entity_1.TrackCalendarEntity, (calendar) => calendar.track),
    __metadata("design:type", Object)
], TrackEntity.prototype, "calendar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Learning periods in this track',
        type: () => [{}],
    }),
    (0, typeorm_1.OneToMany)(() => track_learning_period_entity_1.TrackLearningPeriodEntity, (period) => period.track),
    __metadata("design:type", Object)
], TrackEntity.prototype, "learningPeriods", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Semesters in this track',
        type: () => [semester_entity_1.SemesterEntity],
    }),
    (0, typeorm_1.OneToMany)(() => semester_entity_1.SemesterEntity, (semester) => semester.track),
    __metadata("design:type", Object)
], TrackEntity.prototype, "semesters", void 0);
exports.TrackEntity = TrackEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'tracks' })
], TrackEntity);
//# sourceMappingURL=track.entity.js.map