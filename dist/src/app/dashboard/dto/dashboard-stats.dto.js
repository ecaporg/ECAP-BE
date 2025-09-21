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
exports.DashboardStatsResponseDto = exports.AcademyStatItemDto = exports.DashboardStatItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const academic_year_entity_1 = require("../../../domain/track/entities/academic-year.entity");
const track_learning_period_entity_1 = require("../../../domain/track/entities/track-learning-period.entity");
class DashboardStatItemDto {
}
exports.DashboardStatItemDto = DashboardStatItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Learning period',
        type: track_learning_period_entity_1.TrackLearningPeriodEntity,
    }),
    __metadata("design:type", Array)
], DashboardStatItemDto.prototype, "learningPeriods", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Compliance',
        type: Number,
    }),
    __metadata("design:type", Number)
], DashboardStatItemDto.prototype, "compliance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status',
        type: Boolean,
    }),
    __metadata("design:type", Boolean)
], DashboardStatItemDto.prototype, "completed", void 0);
class AcademyStatItemDto {
}
exports.AcademyStatItemDto = AcademyStatItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Academy id',
        type: String,
    }),
    __metadata("design:type", String)
], AcademyStatItemDto.prototype, "academy_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Academy name',
        type: String,
    }),
    __metadata("design:type", String)
], AcademyStatItemDto.prototype, "academy_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Academy compliance',
        type: Number,
    }),
    __metadata("design:type", Number)
], AcademyStatItemDto.prototype, "compliance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Academy year to date compliance',
        type: Number,
    }),
    __metadata("design:type", Number)
], AcademyStatItemDto.prototype, "yearToDateCompliance", void 0);
class DashboardStatsResponseDto {
}
exports.DashboardStatsResponseDto = DashboardStatsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Learning periods before the previous one',
        type: DashboardStatItemDto,
    }),
    __metadata("design:type", DashboardStatItemDto)
], DashboardStatsResponseDto.prototype, "beforeThePreviousOne", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Previous learning periods',
        type: DashboardStatItemDto,
    }),
    __metadata("design:type", DashboardStatItemDto)
], DashboardStatsResponseDto.prototype, "previousLP", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current learning periods',
        type: DashboardStatItemDto,
    }),
    __metadata("design:type", DashboardStatItemDto)
], DashboardStatsResponseDto.prototype, "currentLP", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Upcoming learning periods',
        type: DashboardStatItemDto,
    }),
    __metadata("design:type", DashboardStatItemDto)
], DashboardStatsResponseDto.prototype, "upcomingLP", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Academic year',
        type: academic_year_entity_1.AcademicYearEntity,
    }),
    __metadata("design:type", academic_year_entity_1.AcademicYearEntity)
], DashboardStatsResponseDto.prototype, "academicYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Year to date compliance',
        type: Number,
    }),
    __metadata("design:type", Number)
], DashboardStatsResponseDto.prototype, "yearToDateCompliance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Academy to date compliance',
        type: AcademyStatItemDto,
    }),
    __metadata("design:type", Array)
], DashboardStatsResponseDto.prototype, "academies", void 0);
//# sourceMappingURL=dashboard-stats.dto.js.map