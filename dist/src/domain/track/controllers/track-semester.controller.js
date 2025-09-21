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
exports.TrackSemesterController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../../core");
const roles_enum_1 = require("../../../auth/enums/roles.enum");
const filters_dto_1 = require("../dto/filters.dto");
const track_semester_dto_1 = require("../dto/track-semester.dto");
const semester_entity_1 = require("../entities/semester.entity");
const track_semester_filter_interceptor_1 = require("../interceptors/track-semester-filter.interceptor");
const semester_service_1 = require("../services/semester.service");
let TrackSemesterController = class TrackSemesterController {
    constructor(semesterService) {
        this.semesterService = semesterService;
    }
    async findAll(options) {
        return this.semesterService.findAll(options);
    }
    async findOne(id) {
        return this.semesterService.findOne(id);
    }
    async create(createTrackSemesterDto) {
        return this.semesterService.create(createTrackSemesterDto);
    }
    async patch(id, updateTrackSemesterDto) {
        return this.semesterService.update(id, updateTrackSemesterDto);
    }
    async put(id, updateTrackSemesterDto) {
        return this.semesterService.update(id, updateTrackSemesterDto);
    }
    async delete(id) {
        return this.semesterService.delete(id);
    }
};
exports.TrackSemesterController = TrackSemesterController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all tracks semesters with pagination' }),
    (0, core_1.ApiPaginationQueries)(),
    (0, core_1.ApiPaginatedCrudResponse)(semester_entity_1.SemesterEntity),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN, roles_enum_1.RolesEnum.ADMIN, roles_enum_1.RolesEnum.DIRECTOR, roles_enum_1.RolesEnum.TEACHER),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.TrackSemesterFilterDto]),
    __metadata("design:returntype", Promise)
], TrackSemesterController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get track semester by ID' }),
    (0, core_1.ApiCrudResponse)(semester_entity_1.SemesterEntity),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN, roles_enum_1.RolesEnum.ADMIN, roles_enum_1.RolesEnum.DIRECTOR, roles_enum_1.RolesEnum.TEACHER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrackSemesterController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new track semester' }),
    (0, core_1.ApiCrudResponse)(semester_entity_1.SemesterEntity, 'created'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [track_semester_dto_1.CreateTrackSemesterDto]),
    __metadata("design:returntype", Promise)
], TrackSemesterController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a track semester (partially)' }),
    (0, core_1.ApiCrudResponse)(semester_entity_1.SemesterEntity),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, track_semester_dto_1.UpdateTrackSemesterDto]),
    __metadata("design:returntype", Promise)
], TrackSemesterController.prototype, "patch", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a track semester (fully)' }),
    (0, core_1.ApiCrudResponse)(semester_entity_1.SemesterEntity),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, track_semester_dto_1.UpdateTrackSemesterDto]),
    __metadata("design:returntype", Promise)
], TrackSemesterController.prototype, "put", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a track learning period' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Track learning period deleted successfully' }),
    (0, core_1.ApiErrorResponses)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrackSemesterController.prototype, "delete", null);
exports.TrackSemesterController = TrackSemesterController = __decorate([
    (0, swagger_1.ApiTags)('Track Semesters'),
    (0, common_1.Controller)('track-semesters'),
    (0, common_1.UseInterceptors)(track_semester_filter_interceptor_1.TrackSemesterFilterInterceptor),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN),
    __metadata("design:paramtypes", [semester_service_1.SemesterService])
], TrackSemesterController);
//# sourceMappingURL=track-semester.controller.js.map