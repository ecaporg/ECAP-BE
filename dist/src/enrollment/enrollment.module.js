"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tenant_module_1 = require("../tenant/tenant.module");
const track_module_1 = require("../track/track.module");
const student_enrollment_entity_1 = require("./entities/student-enrollment.entity");
const teacher_enrollment_entity_1 = require("./entities/teacher-enrollment.entity");
const student_enrollment_service_1 = require("./services/student-enrollment.service");
const teacher_enrollment_service_1 = require("./services/teacher-enrollment.service");
let EnrollmentModule = class EnrollmentModule {
};
exports.EnrollmentModule = EnrollmentModule;
exports.EnrollmentModule = EnrollmentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                teacher_enrollment_entity_1.TeacherSchoolYearEnrollmentEntity,
                student_enrollment_entity_1.StudentLPEnrollmentEntity,
            ]),
            tenant_module_1.TenantModule,
            track_module_1.TrackModule,
        ],
        providers: [teacher_enrollment_service_1.TeacherSchoolYearEnrollmentService, student_enrollment_service_1.StudentLPEnrollmentService],
        exports: [teacher_enrollment_service_1.TeacherSchoolYearEnrollmentService, student_enrollment_service_1.StudentLPEnrollmentService],
    })
], EnrollmentModule);
//# sourceMappingURL=enrollment.module.js.map