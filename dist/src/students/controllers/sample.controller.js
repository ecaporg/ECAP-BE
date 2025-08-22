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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../core");
const roles_enum_1 = require("../../users/enums/roles.enum");
const filters_dto_1 = require("../dto/filters.dto");
const sample_dto_1 = require("../dto/sample.dto");
const sample_entity_1 = require("../entities/sample.entity");
const sample_flag_entity_1 = require("../entities/sample-flag.entity");
const sample_service_1 = require("../services/sample.service");
const DefaultRoles = [
    roles_enum_1.RolesEnum.ADMIN,
    roles_enum_1.RolesEnum.TEACHER,
    roles_enum_1.RolesEnum.SUPER_ADMIN,
];
let SampleController = class SampleController {
    constructor(sampleService) {
        this.sampleService = sampleService;
    }
    async findAll(options) {
        return this.sampleService.findAll(options);
    }
    async getFlaggedSamples(options) {
        return this.sampleService.getFlaggedSamples(options);
    }
    async findOne(id) {
        return this.sampleService.findOne(id);
    }
    async create(createDto) {
        return this.sampleService.create(createDto);
    }
    async update(id, updateDto) {
        return this.sampleService.update(id, updateDto);
    }
    async delete(id) {
        return this.sampleService.delete(id);
    }
    async flagError(user_id, id, createDto) {
        return this.sampleService.flagError(id, user_id, createDto);
    }
    async flagMissingWork(user_id, id, createDto) {
        return this.sampleService.flagMissingWork(id, user_id, createDto);
    }
    async flagRejected(user_id, id, createDto) {
        return this.sampleService.flagRejected(id, user_id, createDto);
    }
    async flagCompleted(user_id, id, createDto) {
        return this.sampleService.flagCompleted(id, user_id, createDto);
    }
};
exports.SampleController = SampleController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all samples with pagination' }),
    (0, core_1.ApiPaginationQueries)(),
    (0, core_1.ApiPaginatedCrudResponse)(sample_entity_1.SampleEntity),
    (0, core_1.Roles)(...DefaultRoles, roles_enum_1.RolesEnum.DIRECTOR),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SampleController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseInterceptors)(new core_1.AttachUserIdInterceptor([
        {
            role: roles_enum_1.RolesEnum.DIRECTOR,
            path: 'student_lp_enrollments.student.academy_id',
            map: (user) => user.director?.academy?.id,
        },
        {
            role: roles_enum_1.RolesEnum.TEACHER,
            path: 'student_lp_enrollments.teacher_school_year_enrollment.teacher_id',
        },
    ])),
    (0, common_1.Get)('flagged'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all flagged samples' }),
    (0, core_1.ApiPaginationQueries)(),
    (0, core_1.ApiPaginatedCrudResponse)(sample_entity_1.SampleEntity),
    (0, core_1.Roles)(...DefaultRoles, roles_enum_1.RolesEnum.DIRECTOR),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.FlaggedSamplesFilterDto]),
    __metadata("design:returntype", Promise)
], SampleController.prototype, "getFlaggedSamples", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get sample by ID' }),
    (0, core_1.ApiCrudResponse)(sample_entity_1.SampleEntity),
    (0, core_1.Roles)(...DefaultRoles, roles_enum_1.RolesEnum.DIRECTOR),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SampleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new sample' }),
    (0, core_1.ApiCrudResponse)(sample_entity_1.SampleEntity, 'created'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sample_dto_1.CreateSampleDto]),
    __metadata("design:returntype", Promise)
], SampleController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a sample' }),
    (0, core_1.ApiCrudResponse)(sample_entity_1.SampleEntity),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, sample_dto_1.UpdateSampleDto]),
    __metadata("design:returntype", Promise)
], SampleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a sample' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Sample deleted successfully' }),
    (0, core_1.ApiErrorResponses)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SampleController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/flag-error'),
    (0, swagger_1.ApiOperation)({ summary: 'Flag an error in a sample' }),
    (0, core_1.ApiCrudResponse)(sample_flag_entity_1.SampleFlagErrorEntity),
    __param(0, (0, core_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, sample_dto_1.CreateSampleFlagErrorDto]),
    __metadata("design:returntype", Promise)
], SampleController.prototype, "flagError", null);
__decorate([
    (0, common_1.Post)(':id/flag-missing-work'),
    (0, swagger_1.ApiOperation)({ summary: 'Flag missing work in a sample' }),
    (0, core_1.ApiCrudResponse)(sample_flag_entity_1.SampleFlagMissingWorkEntity),
    __param(0, (0, core_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, sample_dto_1.CreateSampleFlagMissingWorkDto]),
    __metadata("design:returntype", Promise)
], SampleController.prototype, "flagMissingWork", null);
__decorate([
    (0, common_1.Post)(':id/flag-rejected'),
    (0, swagger_1.ApiOperation)({ summary: 'Flag a rejected sample' }),
    (0, core_1.ApiCrudResponse)(sample_flag_entity_1.SampleFlagRejectedEntity),
    __param(0, (0, core_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, sample_dto_1.CreateSampleFlagRejectedDto]),
    __metadata("design:returntype", Promise)
], SampleController.prototype, "flagRejected", null);
__decorate([
    (0, common_1.Post)(':id/flag-completed'),
    (0, swagger_1.ApiOperation)({ summary: 'Flag a completed sample' }),
    (0, core_1.ApiCrudResponse)(sample_flag_entity_1.SampleFlagCompletedEntity),
    __param(0, (0, core_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, sample_dto_1.CreateSampleFlagCompletedDto]),
    __metadata("design:returntype", Promise)
], SampleController.prototype, "flagCompleted", null);
exports.SampleController = SampleController = __decorate([
    (0, swagger_1.ApiTags)('Samples'),
    (0, common_1.Controller)('samples'),
    (0, core_1.Roles)(...DefaultRoles),
    __metadata("design:paramtypes", [sample_service_1.SampleService])
], SampleController);
//# sourceMappingURL=sample.controller.js.map