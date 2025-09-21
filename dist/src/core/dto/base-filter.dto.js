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
exports.BaseFilterDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../constants");
const filter_dto_decorators_1 = require("../decorators/filter-dto.decorators");
class BaseFilterDto {
    constructor() {
        this.page = 1;
        this.limit = 15;
    }
}
exports.BaseFilterDto = BaseFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: 1, minimum: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], BaseFilterDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: 10, minimum: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], BaseFilterDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [String], default: ['updatedAt'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string'
        ? value.split(constants_1.FILTER_SEPARATOR_FOR_MULTIPLE_VALUES)
        : value),
    __metadata("design:type", Array)
], BaseFilterDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: constants_1.SortDirectionEnum,
        default: ['ASC'],
        isArray: true,
    }),
    (0, filter_dto_decorators_1.IdDecorator)(),
    (0, class_validator_1.IsEnum)(constants_1.SortDirectionEnum, { each: true }),
    __metadata("design:type", Array)
], BaseFilterDto.prototype, "sortDirection", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Search query' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseFilterDto.prototype, "search", void 0);
__decorate([
    (0, filter_dto_decorators_1.IdDecorator)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], BaseFilterDto.prototype, "searchFields", void 0);
//# sourceMappingURL=base-filter.dto.js.map