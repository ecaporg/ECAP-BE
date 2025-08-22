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
exports.TeacherController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../core");
const roles_enum_1 = require("../../users/enums/roles.enum");
const staff_entity_1 = require("../entities/staff.entity");
const staff_service_1 = require("../services/staff.service");
let TeacherController = class TeacherController {
    constructor(service) {
        this.service = service;
    }
    async findOne(id) {
        return this.service.findOne(id);
    }
};
exports.TeacherController = TeacherController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get entity by ID' }),
    (0, core_1.ApiCrudResponse)(staff_entity_1.TeacherEntity),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "findOne", null);
exports.TeacherController = TeacherController = __decorate([
    (0, swagger_1.ApiTags)('Teacher'),
    (0, common_1.Controller)('teachers'),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN, roles_enum_1.RolesEnum.ADMIN, roles_enum_1.RolesEnum.DIRECTOR, roles_enum_1.RolesEnum.TEACHER),
    __metadata("design:paramtypes", [staff_service_1.TeacherService])
], TeacherController);
//# sourceMappingURL=teacher.controller.js.map