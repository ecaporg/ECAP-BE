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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasEventType = exports.CanvasSubmissionUpdatedEventDto = exports.CanvasSubmissionCreatedEventDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const canvas_event_body_dto_1 = require("./canvas-event-body.dto");
const canvas_event_metadata_dto_1 = require("./canvas-event-metadata.dto");
class CanvasSubmissionCreatedEventDto {
}
exports.CanvasSubmissionCreatedEventDto = CanvasSubmissionCreatedEventDto;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => canvas_event_metadata_dto_1.CanvasEventMetadataDto),
    __metadata("design:type", canvas_event_metadata_dto_1.CanvasEventMetadataDto)
], CanvasSubmissionCreatedEventDto.prototype, "metadata", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => canvas_event_body_dto_1.CanvasSubmissionEventBodyDto),
    __metadata("design:type", canvas_event_body_dto_1.CanvasSubmissionEventBodyDto)
], CanvasSubmissionCreatedEventDto.prototype, "body", void 0);
class CanvasSubmissionUpdatedEventDto {
}
exports.CanvasSubmissionUpdatedEventDto = CanvasSubmissionUpdatedEventDto;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => canvas_event_metadata_dto_1.CanvasEventMetadataDto),
    __metadata("design:type", canvas_event_metadata_dto_1.CanvasEventMetadataDto)
], CanvasSubmissionUpdatedEventDto.prototype, "metadata", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => canvas_event_body_dto_1.CanvasSubmissionEventBodyDto),
    __metadata("design:type", canvas_event_body_dto_1.CanvasSubmissionEventBodyDto)
], CanvasSubmissionUpdatedEventDto.prototype, "body", void 0);
var CanvasEventType;
(function (CanvasEventType) {
    CanvasEventType["SUBMISSION_CREATED"] = "submission_created";
    CanvasEventType["SUBMISSION_UPDATED"] = "submission_updated";
})(CanvasEventType || (exports.CanvasEventType = CanvasEventType = {}));
//# sourceMappingURL=canvas-event.dto.js.map