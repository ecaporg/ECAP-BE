"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const staff_module_1 = require("../staff/staff.module");
const track_controller_1 = require("./controllers/track.controller");
const track_calendar_controller_1 = require("./controllers/track-calendar.controller");
const track_learning_period_controller_1 = require("./controllers/track-learning-period.controller");
const track_semester_controller_1 = require("./controllers/track-semester.controller");
const academic_year_entity_1 = require("./entities/academic-year.entity");
const semester_entity_1 = require("./entities/semester.entity");
const subject_entity_1 = require("./entities/subject.entity");
const track_entity_1 = require("./entities/track.entity");
const track_calendar_entity_1 = require("./entities/track-calendar.entity");
const track_learning_period_entity_1 = require("./entities/track-learning-period.entity");
const academic_year_service_1 = require("./services/academic-year.service");
const semester_service_1 = require("./services/semester.service");
const subject_service_1 = require("./services/subject.service");
const track_service_1 = require("./services/track.service");
const track_calendar_service_1 = require("./services/track-calendar.service");
const track_learning_period_service_1 = require("./services/track-learning-period.service");
const track_calendar_subscriber_1 = require("./subscribers/track-calendar.subscriber");
let TrackModule = class TrackModule {
};
exports.TrackModule = TrackModule;
exports.TrackModule = TrackModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                track_entity_1.TrackEntity,
                track_calendar_entity_1.TrackCalendarEntity,
                track_learning_period_entity_1.TrackLearningPeriodEntity,
                subject_entity_1.SubjectEntity,
                academic_year_entity_1.AcademicYearEntity,
                semester_entity_1.SemesterEntity,
            ]),
            staff_module_1.StaffModule,
        ],
        controllers: [
            track_controller_1.TrackController,
            track_calendar_controller_1.TrackCalendarController,
            track_learning_period_controller_1.TrackLearningPeriodController,
            track_semester_controller_1.TrackSemesterController,
        ],
        providers: [
            track_service_1.TrackService,
            track_calendar_service_1.TrackCalendarService,
            track_learning_period_service_1.TrackLearningPeriodService,
            subject_service_1.SubjectService,
            academic_year_service_1.AcademicYearService,
            semester_service_1.SemesterService,
            track_calendar_subscriber_1.TrackCalendarSubscriber,
        ],
        exports: [
            track_service_1.TrackService,
            track_calendar_service_1.TrackCalendarService,
            track_learning_period_service_1.TrackLearningPeriodService,
            subject_service_1.SubjectService,
            academic_year_service_1.AcademicYearService,
            semester_service_1.SemesterService,
        ],
    })
], TrackModule);
//# sourceMappingURL=track.module.js.map