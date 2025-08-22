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
exports.CreateSampleFlagCompletedDto = exports.CreateSampleFlagRejectedDto = exports.CreateSampleFlagMissingWorkDto = exports.CreateSampleFlagErrorDto = exports.UpdateSampleDto = exports.CreateSampleDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const sample_entity_1 = require("../entities/sample.entity");
class CreateSampleDto {
    constructor() {
        this.status = sample_entity_1.SampleStatus.PENDING;
    }
}
exports.CreateSampleDto = CreateSampleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assignment title', maxLength: 250 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(250),
    __metadata("design:type", String)
], CreateSampleDto.prototype, "assignment_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sample status',
        enum: sample_entity_1.SampleStatus,
        default: sample_entity_1.SampleStatus.PENDING,
    }),
    (0, class_validator_1.IsEnum)(sample_entity_1.SampleStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSampleDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Student LP enrollment ID associated with this sample',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateSampleDto.prototype, "student_lp_enrollment_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subject ID associated with this sample' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateSampleDto.prototype, "subject_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID associated with this sample' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateSampleDto.prototype, "done_by_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Grade' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSampleDto.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Submission date' }),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateSampleDto.prototype, "date", void 0);
class UpdateSampleDto extends (0, swagger_1.PartialType)(CreateSampleDto) {
}
exports.UpdateSampleDto = UpdateSampleDto;
class CreateSampleFlagErrorDto {
}
exports.CreateSampleFlagErrorDto = CreateSampleFlagErrorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Comment' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSampleFlagErrorDto.prototype, "comment", void 0);
class CreateSampleFlagMissingWorkDto {
}
exports.CreateSampleFlagMissingWorkDto = CreateSampleFlagMissingWorkDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reason' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSampleFlagMissingWorkDto.prototype, "reason", void 0);
class CreateSampleFlagRejectedDto {
}
exports.CreateSampleFlagRejectedDto = CreateSampleFlagRejectedDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reason' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSampleFlagRejectedDto.prototype, "reason", void 0);
class CreateSampleFlagCompletedDto {
}
exports.CreateSampleFlagCompletedDto = CreateSampleFlagCompletedDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Message' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSampleFlagCompletedDto.prototype, "message", void 0);
//# sourceMappingURL=sample.dto.js.map