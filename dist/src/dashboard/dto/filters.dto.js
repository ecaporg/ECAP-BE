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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardFilterDto = void 0;
const class_validator_1 = require("class-validator");
const core_1 = require("../../core");
const FILTER_KEYS = {
    ADMIN: 'track.tenant.admins.id',
    DIRECTOR: 'student_lp_enrollments.student.academy_id',
    TEACHER: 'student_lp_enrollments.teacher_school_year_enrollment.teacher_id',
};
class DashboardFilterDto extends core_1.BaseFilterDto {
}
exports.DashboardFilterDto = DashboardFilterDto;
_a = FILTER_KEYS.DIRECTOR, _b = FILTER_KEYS.ADMIN, _c = FILTER_KEYS.TEACHER;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DashboardFilterDto.prototype, _a, void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DashboardFilterDto.prototype, _b, void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DashboardFilterDto.prototype, _c, void 0);
//# sourceMappingURL=filters.dto.js.map