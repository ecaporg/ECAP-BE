import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CanvasSubmissionDto {
  @IsNumber()
  id: number;

  @IsNumber()
  assignment_id: number;

  @IsOptional()
  assignment?: any;

  @IsOptional()
  course?: any;

  @IsNumber()
  attempt: number;

  @IsOptional()
  @IsString()
  body?: string;

  @IsOptional()
  @IsString()
  grade?: string;

  @IsBoolean()
  grade_matches_current_submission: boolean;

  @IsString()
  html_url: string;

  @IsString()
  preview_url: string;

  @IsOptional()
  @IsNumber()
  score?: number;

  @IsOptional()
  @IsArray()
  submission_comments?: any[];

  @IsOptional()
  @IsString()
  submission_type?: string;

  @IsOptional()
  @IsString()
  submitted_at?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsNumber()
  user_id: number;

  @IsOptional()
  @IsNumber()
  grader_id?: number;

  @IsOptional()
  @IsString()
  graded_at?: string;

  @IsOptional()
  user?: any;

  @IsBoolean()
  late: boolean;

  @IsBoolean()
  assignment_visible: boolean;

  @IsOptional()
  @IsBoolean()
  excused?: boolean;

  @IsOptional()
  @IsBoolean()
  missing?: boolean;

  @IsOptional()
  @IsString()
  late_policy_status?: string;

  @IsOptional()
  @IsNumber()
  points_deducted?: number;

  @IsOptional()
  @IsNumber()
  seconds_late?: number;

  @IsString()
  workflow_state: string;

  @IsOptional()
  @IsNumber()
  extra_attempts?: number;

  @IsOptional()
  @IsString()
  anonymous_id?: string;
}
