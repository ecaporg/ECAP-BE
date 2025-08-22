"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasSubmissionEventBodyDto = exports.CanvasEventMetadataDto = exports.CanvasSubmissionDto = exports.SubmissionSummaryDto = exports.SubmissionCommentDto = exports.MediaCommentDto = exports.CanvasUserDto = exports.CanvasEnrollmentDto = exports.CanvasCourseDto = exports.CanvasAssignmentDto = void 0;
var canvas_assignment_dto_1 = require("./canvas-assignment.dto");
Object.defineProperty(exports, "CanvasAssignmentDto", { enumerable: true, get: function () { return canvas_assignment_dto_1.CanvasAssignmentDto; } });
var canvas_course_dto_1 = require("./canvas-course.dto");
Object.defineProperty(exports, "CanvasCourseDto", { enumerable: true, get: function () { return canvas_course_dto_1.CanvasCourseDto; } });
var canvas_enrollment_dto_1 = require("./canvas-enrollment.dto");
Object.defineProperty(exports, "CanvasEnrollmentDto", { enumerable: true, get: function () { return canvas_enrollment_dto_1.CanvasEnrollmentDto; } });
var canvas_user_dto_1 = require("./canvas-user.dto");
Object.defineProperty(exports, "CanvasUserDto", { enumerable: true, get: function () { return canvas_user_dto_1.CanvasUserDto; } });
var media_comment_dto_1 = require("./media-comment.dto");
Object.defineProperty(exports, "MediaCommentDto", { enumerable: true, get: function () { return media_comment_dto_1.MediaCommentDto; } });
var submission_comment_dto_1 = require("./submission-comment.dto");
Object.defineProperty(exports, "SubmissionCommentDto", { enumerable: true, get: function () { return submission_comment_dto_1.SubmissionCommentDto; } });
var submission_summary_dto_1 = require("./submission-summary.dto");
Object.defineProperty(exports, "SubmissionSummaryDto", { enumerable: true, get: function () { return submission_summary_dto_1.SubmissionSummaryDto; } });
var canvas_submission_dto_1 = require("./canvas-submission.dto");
Object.defineProperty(exports, "CanvasSubmissionDto", { enumerable: true, get: function () { return canvas_submission_dto_1.CanvasSubmissionDto; } });
var canvas_event_metadata_dto_1 = require("./canvas-event-metadata.dto");
Object.defineProperty(exports, "CanvasEventMetadataDto", { enumerable: true, get: function () { return canvas_event_metadata_dto_1.CanvasEventMetadataDto; } });
var canvas_event_body_dto_1 = require("./canvas-event-body.dto");
Object.defineProperty(exports, "CanvasSubmissionEventBodyDto", { enumerable: true, get: function () { return canvas_event_body_dto_1.CanvasSubmissionEventBodyDto; } });
__exportStar(require("./canvas-event.dto"), exports);
//# sourceMappingURL=index.js.map