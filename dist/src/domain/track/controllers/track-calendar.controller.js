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
exports.TrackCalendarController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../../core");
const roles_enum_1 = require("../../../auth/enums/roles.enum");
const filters_dto_1 = require("../dto/filters.dto");
const track_calendar_dto_1 = require("../dto/track-calendar.dto");
const track_calendar_entity_1 = require("../entities/track-calendar.entity");
const track_calendar_filter_interceptor_1 = require("../interceptors/track-calendar-filter.interceptor");
const track_calendar_service_1 = require("../services/track-calendar.service");
let TrackCalendarController = class TrackCalendarController {
    constructor(trackCalendarService) {
        this.trackCalendarService = trackCalendarService;
    }
    async findAll(options) {
        return this.trackCalendarService.findAll(options);
    }
    async findOne(id) {
        return this.trackCalendarService.findOne(id);
    }
    async create(createTrackCalendarDto) {
        return this.trackCalendarService.create(createTrackCalendarDto);
    }
    async patch(id, updateTrackCalendarDto) {
        return this.trackCalendarService.update(id, updateTrackCalendarDto);
    }
    async put(id, updateTrackCalendarDto) {
        return this.trackCalendarService.update(id, updateTrackCalendarDto);
    }
    async delete(id) {
        return this.trackCalendarService.delete(id);
    }
};
exports.TrackCalendarController = TrackCalendarController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all tracks calendar with pagination' }),
    (0, core_1.ApiPaginationQueries)(),
    (0, core_1.ApiPaginatedCrudResponse)(track_calendar_entity_1.TrackCalendarEntity),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN, roles_enum_1.RolesEnum.ADMIN, roles_enum_1.RolesEnum.DIRECTOR, roles_enum_1.RolesEnum.TEACHER),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.TrackCalendarFilterDto]),
    __metadata("design:returntype", Promise)
], TrackCalendarController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get track calendar by ID' }),
    (0, core_1.ApiCrudResponse)(track_calendar_entity_1.TrackCalendarEntity),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN, roles_enum_1.RolesEnum.ADMIN, roles_enum_1.RolesEnum.DIRECTOR, roles_enum_1.RolesEnum.TEACHER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrackCalendarController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new track' }),
    (0, core_1.ApiCrudResponse)(track_calendar_entity_1.TrackCalendarEntity, 'created'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [track_calendar_dto_1.CreateTrackCalendarDto]),
    __metadata("design:returntype", Promise)
], TrackCalendarController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a track calendar (partially)' }),
    (0, core_1.ApiCrudResponse)(track_calendar_entity_1.TrackCalendarEntity),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, track_calendar_dto_1.UpdateTrackCalendarDto]),
    __metadata("design:returntype", Promise)
], TrackCalendarController.prototype, "patch", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a track calendar (fully)' }),
    (0, core_1.ApiCrudResponse)(track_calendar_entity_1.TrackCalendarEntity),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, track_calendar_dto_1.UpdateTrackCalendarDto]),
    __metadata("design:returntype", Promise)
], TrackCalendarController.prototype, "put", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a track calendar' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Track calendar deleted successfully' }),
    (0, core_1.ApiErrorResponses)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrackCalendarController.prototype, "delete", null);
exports.TrackCalendarController = TrackCalendarController = __decorate([
    (0, swagger_1.ApiTags)('Track Calendar'),
    (0, common_1.Controller)('track-calendars'),
    (0, common_1.UseInterceptors)(track_calendar_filter_interceptor_1.TrackCalendarFilterInterceptor),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN),
    __metadata("design:paramtypes", [track_calendar_service_1.TrackCalendarService])
], TrackCalendarController);
//# sourceMappingURL=track-calendar.controller.js.map