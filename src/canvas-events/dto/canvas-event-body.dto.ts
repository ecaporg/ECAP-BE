import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CanvasSubmissionEventBodyDto {
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

  @IsString()
  submission_type: string;

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

  @IsString()
  workflow_state: string;
}
