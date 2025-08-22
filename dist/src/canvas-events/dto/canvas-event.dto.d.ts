import { CanvasSubmissionEventBodyDto } from './canvas-event-body.dto';
import { CanvasEventMetadataDto } from './canvas-event-metadata.dto';
export declare class CanvasSubmissionCreatedEventDto {
    metadata: CanvasEventMetadataDto;
    body: CanvasSubmissionEventBodyDto;
}
export declare class CanvasSubmissionUpdatedEventDto {
    metadata: CanvasEventMetadataDto;
    body: CanvasSubmissionEventBodyDto;
}
export declare enum CanvasEventType {
    SUBMISSION_CREATED = "submission_created",
    SUBMISSION_UPDATED = "submission_updated"
}
export type CanvasEventDto = CanvasSubmissionCreatedEventDto | CanvasSubmissionUpdatedEventDto;
