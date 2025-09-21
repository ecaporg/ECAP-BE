"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const staff_module_1 = require("../staff/staff.module");
const assignment_entity_1 = require("./entities/assignment.entity");
const course_entity_1 = require("./entities/course.entity");
const assignment_service_1 = require("./services/assignment.service");
const course_service_1 = require("./services/course.service");
let SubjectModule = class SubjectModule {
};
exports.SubjectModule = SubjectModule;
exports.SubjectModule = SubjectModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([course_entity_1.CourseEntity, assignment_entity_1.AssignmentEntity]),
            staff_module_1.StaffModule,
        ],
        controllers: [],
        providers: [course_service_1.CourseService, assignment_service_1.CourseAssignmentService],
        exports: [course_service_1.CourseService, assignment_service_1.CourseAssignmentService],
    })
], SubjectModule);
//# sourceMappingURL=subject.module.js.map