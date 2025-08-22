"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sample_controller_1 = require("./controllers/sample.controller");
const sample_entity_1 = require("./entities/sample.entity");
const sample_flag_entity_1 = require("./entities/sample-flag.entity");
const student_entity_1 = require("./entities/student.entity");
const sample_service_1 = require("./services/sample.service");
const sample_flag_service_1 = require("./services/sample-flag.service");
const student_service_1 = require("./services/student.service");
const sample_subscriber_1 = require("./subscribers/sample.subscriber");
let StudentsModule = class StudentsModule {
};
exports.StudentsModule = StudentsModule;
exports.StudentsModule = StudentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                student_entity_1.StudentEntity,
                sample_entity_1.SampleEntity,
                sample_flag_entity_1.SampleFlagErrorEntity,
                sample_flag_entity_1.SampleFlagMissingWorkEntity,
                sample_flag_entity_1.SampleFlagRejectedEntity,
                sample_flag_entity_1.SampleFlagCompletedEntity,
            ]),
        ],
        controllers: [sample_controller_1.SampleController],
        providers: [
            student_service_1.StudentService,
            sample_service_1.SampleService,
            sample_flag_service_1.SampleFlagErrorService,
            sample_flag_service_1.SampleFlagMissingWorkService,
            sample_flag_service_1.SampleFlagCompletedService,
            sample_flag_service_1.SampleFlagRejectedService,
            sample_subscriber_1.SampleSubscriber,
        ],
        exports: [
            student_service_1.StudentService,
            sample_service_1.SampleService,
            sample_flag_service_1.SampleFlagErrorService,
            sample_flag_service_1.SampleFlagMissingWorkService,
            sample_flag_service_1.SampleFlagCompletedService,
            sample_flag_service_1.SampleFlagRejectedService,
        ],
    })
], StudentsModule);
//# sourceMappingURL=students.module.js.map