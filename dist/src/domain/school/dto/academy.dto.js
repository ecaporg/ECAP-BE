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
exports.UpdateAcademyDto = exports.CreateAcademyDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateAcademyDto {
}
exports.CreateAcademyDto = CreateAcademyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the academy',
        example: 'Greenwood High',
        maxLength: 255,
    }),
    (0, class_validator_1.IsString)({ message: 'School name must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'School name is required' }),
    (0, class_validator_1.MaxLength)(255, { message: 'School name cannot exceed 255 characters' }),
    __metadata("design:type", String)
], CreateAcademyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the tenant',
        example: 1,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Tenant ID must be a number' }),
    (0, class_validator_1.IsOptional)({ message: 'Tenant ID is required' }),
    __metadata("design:type", Number)
], CreateAcademyDto.prototype, "tenant_id", void 0);
class UpdateAcademyDto extends (0, swagger_1.PartialType)(CreateAcademyDto) {
}
exports.UpdateAcademyDto = UpdateAcademyDto;
//# sourceMappingURL=academy.dto.js.map