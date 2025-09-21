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
exports.TrackController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../../core");
const user_entity_1 = require("../../../auth/entities/user.entity");
const roles_enum_1 = require("../../../auth/enums/roles.enum");
const filters_dto_1 = require("../dto/filters.dto");
const track_dto_1 = require("../dto/track.dto");
const track_entity_1 = require("../entities/track.entity");
const track_filter_interceptor_1 = require("../interceptors/track-filter.interceptor");
const track_service_1 = require("../services/track.service");
let TrackController = class TrackController {
    constructor(trackService) {
        this.trackService = trackService;
    }
    async findAll(options) {
        return this.trackService.findAll(options);
    }
    async findAllPeriods(options) {
        return this.trackService.findAll(options, {
            learningPeriods: true,
        });
    }
    async findAllSemesters(options) {
        return this.trackService.findAll(options, {
            semesters: true,
        });
    }
    async findOne(id) {
        return this.trackService.findOne(id);
    }
    async create(createTrackDto, user) {
        return this.trackService.adminCreate(createTrackDto, user);
    }
    async patch(id, updateTrackDto) {
        return this.trackService.update(id, updateTrackDto);
    }
    async put(id, updateTrackDto) {
        return this.trackService.update(id, updateTrackDto);
    }
    async delete(id) {
        return this.trackService.delete(id);
    }
};
exports.TrackController = TrackController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all tracks with pagination' }),
    (0, core_1.ApiPaginationQueries)(),
    (0, core_1.ApiPaginatedCrudResponse)(track_entity_1.TrackEntity),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN, roles_enum_1.RolesEnum.ADMIN, roles_enum_1.RolesEnum.DIRECTOR, roles_enum_1.RolesEnum.TEACHER),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.TrackFilterDto]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/periods'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all tracks with learning periods with pagination',
    }),
    (0, core_1.ApiPaginationQueries)(),
    (0, core_1.ApiPaginatedCrudResponse)(track_entity_1.TrackEntity),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN, roles_enum_1.RolesEnum.ADMIN, roles_enum_1.RolesEnum.DIRECTOR, roles_enum_1.RolesEnum.TEACHER),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.TrackFilterDto]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "findAllPeriods", null);
__decorate([
    (0, common_1.Get)('/semesters'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all tracks with semesters with pagination',
    }),
    (0, core_1.ApiPaginationQueries)(),
    (0, core_1.ApiPaginatedCrudResponse)(track_entity_1.TrackEntity),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN, roles_enum_1.RolesEnum.ADMIN, roles_enum_1.RolesEnum.DIRECTOR, roles_enum_1.RolesEnum.TEACHER),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.TrackFilterDto]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "findAllSemesters", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get track by ID' }),
    (0, core_1.ApiCrudResponse)(track_entity_1.TrackEntity),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN, roles_enum_1.RolesEnum.ADMIN, roles_enum_1.RolesEnum.DIRECTOR, roles_enum_1.RolesEnum.TEACHER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new track' }),
    (0, core_1.ApiCrudResponse)(track_entity_1.TrackEntity, 'created'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, core_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [track_dto_1.CreateTrackDto,
        user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a track (partially)' }),
    (0, core_1.ApiCrudResponse)(track_entity_1.TrackEntity),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, track_dto_1.UpdateTrackDto]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "patch", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a track (fully)' }),
    (0, core_1.ApiCrudResponse)(track_entity_1.TrackEntity),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, track_dto_1.UpdateTrackDto]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "put", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a track' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Track deleted successfully' }),
    (0, core_1.ApiErrorResponses)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "delete", null);
exports.TrackController = TrackController = __decorate([
    (0, swagger_1.ApiTags)('Tracks'),
    (0, common_1.Controller)('tracks'),
    (0, common_1.UseInterceptors)(track_filter_interceptor_1.TrackFilterInterceptor),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN),
    __metadata("design:paramtypes", [track_service_1.TrackService])
], TrackController);
//# sourceMappingURL=track.controller.js.map