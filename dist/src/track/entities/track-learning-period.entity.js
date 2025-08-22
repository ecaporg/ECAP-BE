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
exports.TrackLearningPeriodEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../core");
const student_enrollment_entity_1 = require("../../enrollment/entities/student-enrollment.entity");
const track_entity_1 = require("./track.entity");
let TrackLearningPeriodEntity = class TrackLearningPeriodEntity extends core_1.GenericEntity {
};
exports.TrackLearningPeriodEntity = TrackLearningPeriodEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Track ID associated with this learning period' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TrackLearningPeriodEntity.prototype, "track_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Learning period name', maxLength: 250 }),
    (0, typeorm_1.Column)({ length: 250 }),
    __metadata("design:type", String)
], TrackLearningPeriodEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Learning period start date' }),
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], TrackLearningPeriodEntity.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Learning period end date' }),
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], TrackLearningPeriodEntity.prototype, "end_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Track associated with this learning period',
        type: () => Object,
    }),
    (0, typeorm_1.ManyToOne)(() => track_entity_1.TrackEntity, (track) => track.learningPeriods, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'track_id' }),
    __metadata("design:type", track_entity_1.TrackEntity)
], TrackLearningPeriodEntity.prototype, "track", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Student LP enrollments in this learning period',
        type: () => [{}],
    }),
    (0, typeorm_1.OneToMany)(() => student_enrollment_entity_1.StudentLPEnrollmentEntity, (student_lp_enrollment) => student_lp_enrollment.learning_period),
    __metadata("design:type", Array)
], TrackLearningPeriodEntity.prototype, "student_lp_enrollments", void 0);
exports.TrackLearningPeriodEntity = TrackLearningPeriodEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'track_learning_periods' })
], TrackLearningPeriodEntity);
//# sourceMappingURL=track-learning-period.entity.js.map