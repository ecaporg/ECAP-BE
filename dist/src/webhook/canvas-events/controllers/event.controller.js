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
var CanvasEventController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasEventController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const canvas_event_service_1 = require("../services/canvas-event.service");
let CanvasEventController = CanvasEventController_1 = class CanvasEventController {
    constructor(service) {
        this.service = service;
        this.logger = new common_1.Logger(CanvasEventController_1.name);
    }
    courseEvent(event, domain) {
        this.logger.log(`Processing course event for domain: ${domain}, event: ${JSON.stringify(event, null, 2)}`);
        return this.service.processCourseEvent(event, domain);
    }
    assignmentEvent(event, domain) {
        this.logger.log(`Processing assignment event for domain: ${domain}, event: ${JSON.stringify(event, null, 2)}`);
        return this.service.processAssignmentEvent(event, domain);
    }
    submissionEvent(event, domain) {
        this.logger.log(`Processing submission event for domain: ${domain}, event: ${JSON.stringify(event, null, 2)}`);
        return this.service.processSubmissionEvent(event, domain);
    }
    enrolmentEvent(event, domain) {
        this.logger.log(`Processing enrolment event for domain: ${domain}, event: ${JSON.stringify(event, null, 2)}`);
        return this.service.processEnrollmentEvent(event, domain);
    }
};
exports.CanvasEventController = CanvasEventController;
__decorate([
    (0, common_1.Post)('course'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('domain')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CanvasEventController.prototype, "courseEvent", null);
__decorate([
    (0, common_1.Post)('assignment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('domain')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CanvasEventController.prototype, "assignmentEvent", null);
__decorate([
    (0, common_1.Post)('submission'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('domain')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CanvasEventController.prototype, "submissionEvent", null);
__decorate([
    (0, common_1.Post)('enrolment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('domain')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CanvasEventController.prototype, "enrolmentEvent", null);
exports.CanvasEventController = CanvasEventController = CanvasEventController_1 = __decorate([
    (0, swagger_1.ApiTags)('Canvas Event Processor'),
    (0, common_1.Controller)('canvas-events/:domain'),
    __metadata("design:paramtypes", [canvas_event_service_1.CanvasEventService])
], CanvasEventController);
//# sourceMappingURL=event.controller.js.map