"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enrollment_module_1 = require("../enrollment/enrollment.module");
const staff_module_1 = require("../staff/staff.module");
const students_module_1 = require("../students/students.module");
const tenant_module_1 = require("../tenant/tenant.module");
const track_module_1 = require("../track/track.module");
const academy_controller_1 = require("./controllers/academy.controller");
const school_controller_1 = require("./controllers/school.controller");
const academy_entity_1 = require("./entities/academy.entity");
const school_entity_1 = require("./entities/school.entity");
const academy_service_1 = require("./services/academy.service");
const school_service_1 = require("./services/school.service");
let SchoolModule = class SchoolModule {
};
exports.SchoolModule = SchoolModule;
exports.SchoolModule = SchoolModule = __decorate([
    (0, common_1.Module)({
        controllers: [school_controller_1.SchoolController, academy_controller_1.AcademyController],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([school_entity_1.SchoolEntity, academy_entity_1.AcademyEntity]),
            students_module_1.StudentsModule,
            staff_module_1.StaffModule,
            track_module_1.TrackModule,
            tenant_module_1.TenantModule,
            enrollment_module_1.EnrollmentModule,
        ],
        providers: [school_service_1.SchoolService, academy_service_1.AcademyService],
        exports: [
            school_service_1.SchoolService,
            academy_service_1.AcademyService,
            students_module_1.StudentsModule,
            staff_module_1.StaffModule,
            track_module_1.TrackModule,
            tenant_module_1.TenantModule,
            enrollment_module_1.EnrollmentModule,
        ],
    })
], SchoolModule);
//# sourceMappingURL=school.module.js.map