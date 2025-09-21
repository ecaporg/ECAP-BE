"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasEventsModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const school_module_1 = require("../../domain/school/school.module");
const users_module_1 = require("../../auth/users.module");
const event_controller_1 = require("./controllers/event.controller");
const canvas_event_service_1 = require("./services/canvas-event.service");
const canvas_processor_service_1 = require("./services/canvas-processor.service");
const canvas_resources_service_1 = require("./services/canvas-resources.service");
const sis_resources_service_1 = require("./services/sis-resources.service");
let CanvasEventsModule = class CanvasEventsModule {
};
exports.CanvasEventsModule = CanvasEventsModule;
exports.CanvasEventsModule = CanvasEventsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule.register({
                timeout: 300000,
            }),
            school_module_1.SchoolModule,
            users_module_1.UsersModule,
        ],
        providers: [
            canvas_resources_service_1.CanvasResourcesService,
            sis_resources_service_1.SisResourcesService,
            canvas_processor_service_1.CanvasProcessorService,
            canvas_event_service_1.CanvasEventService,
        ],
        controllers: [event_controller_1.CanvasEventController],
        exports: [
            canvas_resources_service_1.CanvasResourcesService,
            sis_resources_service_1.SisResourcesService,
            canvas_processor_service_1.CanvasProcessorService,
            canvas_event_service_1.CanvasEventService,
        ],
    })
], CanvasEventsModule);
//# sourceMappingURL=canvas-events.module.js.map