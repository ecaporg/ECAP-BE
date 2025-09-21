"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplianceTasksModule = void 0;
const common_1 = require("@nestjs/common");
const school_module_1 = require("../../domain/school/school.module");
const admin_controller_1 = require("./controllers/admin.controller");
const teacher_controller_1 = require("./controllers/teacher.controller");
const teacher_filter_interceptor_1 = require("./interceptors/teacher-filter.interceptor");
const admin_service_1 = require("./services/admin.service");
const teacher_service_1 = require("./services/teacher.service");
let ComplianceTasksModule = class ComplianceTasksModule {
};
exports.ComplianceTasksModule = ComplianceTasksModule;
exports.ComplianceTasksModule = ComplianceTasksModule = __decorate([
    (0, common_1.Module)({
        imports: [school_module_1.SchoolModule],
        controllers: [teacher_controller_1.TeacherComplianceTaskController, admin_controller_1.AdminComplianceController],
        providers: [
            teacher_service_1.TeacherComplianceTaskService,
            admin_service_1.AdminComplianceService,
            teacher_filter_interceptor_1.TeacherFilterInterceptor,
        ],
        exports: [teacher_service_1.TeacherComplianceTaskService, admin_service_1.AdminComplianceService],
    })
], ComplianceTasksModule);
//# sourceMappingURL=compliance-tasks.module.js.map