import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum CanvasSubmissionType {
  BASIC_LTI_LAUNCH = 'basic_lti_launch',
  DISCUSSION_TOPIC = 'discussion_topic',
  MEDIA_RECORDING = 'media_recording',
  ONLINE_QUIZ = 'online_quiz',
  ONLINE_TEXT_ENTRY = 'online_text_entry',
  ONLINE_UPLOAD = 'online_upload',
  ONLINE_URL = 'online_url',
}

export enum CanvasWorkflowState {
  SUBMITTED = 'submitted',
  PENDING_REVIEW = 'pending_review',
  GRADED = 'graded',
  UNSUBMITTED = 'unsubmitted',
}

export enum CanvasEventName {
  SUBMISSION_CREATED = 'submission_created',
  SUBMISSION_UPDATED = 'submission_updated',
}

export class CanvasEventMetadataDto {
  @IsString()
  client_ip: string;

  @IsEnum(CanvasEventName)
  event_name: CanvasEventName;

  @IsString()
  event_time: string;

  @IsString()
  hostname: string;

  @IsString()
  http_method: string;

  @IsString()
  producer: string;

  @IsOptional()
  @IsString()
  referrer?: string;

  @IsString()
  request_id: string;

  @IsString()
  root_account_id: string;

  @IsString()
  root_account_lti_guid: string;

  @IsString()
  root_account_uuid: string;

  @IsString()
  session_id: string;

  @IsString()
  url: string;

  @IsString()
  user_agent: string;

  @IsOptional()
  @IsString()
  context_account_id?: string;

  @IsOptional()
  @IsString()
  context_id?: string;

  @IsOptional()
  @IsString()
  context_role?: string;

  @IsOptional()
  @IsString()
  context_sis_source_id?: string;

  @IsOptional()
  @IsString()
  context_type?: string;

  @IsOptional()
  @IsString()
  time_zone?: string;

  @IsOptional()
  @IsString()
  user_account_id?: string;

  @IsOptional()
  @IsString()
  user_id?: string;

  @IsOptional()
  @IsString()
  user_login?: string;

  @IsOptional()
  @IsString()
  user_sis_id?: string;
}

export class CanvasSubmissionDto {
  @IsString()
  assignment_id: string;

  @IsNumber()
  attempt: number;

  @IsOptional()
  @IsString()
  body?: string;

  @IsOptional()
  @IsString()
  grade?: string;

  @IsOptional()
  @IsString()
  graded_at?: string;

  @IsOptional()
  @IsString()
  group_id?: string;

  @IsBoolean()
  late: boolean;

  @IsOptional()
  @IsString()
  lti_assignment_id?: string;

  @IsOptional()
  @IsString()
  lti_user_id?: string;

  @IsBoolean()
  missing: boolean;

  @IsOptional()
  @IsNumber()
  score?: number;

  @IsString()
  submission_id: string;

  @IsEnum(CanvasSubmissionType)
  submission_type: CanvasSubmissionType;

  @IsOptional()
  @IsString()
  submitted_at?: string;

  @IsString()
  updated_at: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsString()
  user_id: string;

  @IsEnum(CanvasWorkflowState)
  workflow_state: CanvasWorkflowState;
}

export class CanvasWebhookEventDto {
  @ValidateNested()
  @Type(() => CanvasEventMetadataDto)
  metadata: CanvasEventMetadataDto;

  @ValidateNested()
  @Type(() => CanvasSubmissionDto)
  body: CanvasSubmissionDto;
}
