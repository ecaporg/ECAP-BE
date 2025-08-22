import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { CanvasSubmissionEventBodyDto } from './canvas-event-body.dto';
import { CanvasEventMetadataDto } from './canvas-event-metadata.dto';

export class CanvasSubmissionCreatedEventDto {
  @ValidateNested()
  @Type(() => CanvasEventMetadataDto)
  metadata: CanvasEventMetadataDto;

  @ValidateNested()
  @Type(() => CanvasSubmissionEventBodyDto)
  body: CanvasSubmissionEventBodyDto;
}

export class CanvasSubmissionUpdatedEventDto {
  @ValidateNested()
  @Type(() => CanvasEventMetadataDto)
  metadata: CanvasEventMetadataDto;

  @ValidateNested()
  @Type(() => CanvasSubmissionEventBodyDto)
  body: CanvasSubmissionEventBodyDto;
}

export enum CanvasEventType {
  SUBMISSION_CREATED = 'submission_created',
  SUBMISSION_UPDATED = 'submission_updated',
}

// Union type for all Canvas events
export type CanvasEventDto =
  | CanvasSubmissionCreatedEventDto
  | CanvasSubmissionUpdatedEventDto;
