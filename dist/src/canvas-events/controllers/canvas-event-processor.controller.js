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
exports.CanvasEventProcessorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const canvas_event_processor_service_1 = require("../services/canvas-event-processor.service");
let CanvasEventProcessorController = class CanvasEventProcessorController {
    constructor(canvasEventProcessorService) {
        this.canvasEventProcessorService = canvasEventProcessorService;
    }
    processCanvasWebhook(event) {
        return this.canvasEventProcessorService.processCanvasEvent(event);
    }
};
exports.CanvasEventProcessorController = CanvasEventProcessorController;
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CanvasEventProcessorController.prototype, "processCanvasWebhook", null);
exports.CanvasEventProcessorController = CanvasEventProcessorController = __decorate([
    (0, swagger_1.ApiTags)('Canvas Event Processor'),
    (0, common_1.Controller)('canvas-events'),
    __metadata("design:paramtypes", [canvas_event_processor_service_1.CanvasEventProcessorService])
], CanvasEventProcessorController);
//# sourceMappingURL=canvas-event-processor.controller.js.map