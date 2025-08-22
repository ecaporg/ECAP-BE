import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CanvasAssignmentDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  created_at: string;

  @IsString()
  updated_at: string;

  @IsOptional()
  @IsString()
  due_at?: string;

  @IsOptional()
  @IsString()
  lock_at?: string;

  @IsOptional()
  @IsString()
  unlock_at?: string;

  @IsBoolean()
  has_overrides: boolean;

  @IsArray()
  all_dates: any[];

  @IsNumber()
  course_id: number;

  @IsString()
  html_url: string;

  @IsOptional()
  @IsString()
  submissions_download_url?: string;

  @IsNumber()
  assignment_group_id: number;

  @IsOptional()
  @IsNumber()
  due_date_required?: boolean;

  @IsArray()
  allowed_extensions: string[];

  @IsNumber()
  turnitin_enabled: boolean;

  @IsBoolean()
  vericite_enabled: boolean;

  @IsOptional()
  @IsString()
  turnitin_settings?: string;

  @IsBoolean()
  grade_group_students_individually: boolean;

  @IsOptional()
  external_tool_tag_attributes?: any;

  @IsBoolean()
  peer_reviews: boolean;

  @IsBoolean()
  automatic_peer_reviews: boolean;

  @IsOptional()
  @IsNumber()
  peer_review_count?: number;

  @IsOptional()
  @IsString()
  peer_reviews_assign_at?: string;

  @IsBoolean()
  intra_group_peer_reviews: boolean;

  @IsNumber()
  group_category_id: number;

  @IsOptional()
  @IsNumber()
  needs_grading_count?: number;

  @IsOptional()
  @IsNumber()
  needs_grading_count_by_section?: any[];

  @IsString()
  position: string;

  @IsBoolean()
  post_to_sis: boolean;

  @IsString()
  integration_id: string;

  @IsOptional()
  integration_data?: any;

  @IsOptional()
  @IsNumber()
  points_possible?: number;

  @IsArray()
  submission_types: string[];

  @IsBoolean()
  has_submitted_submissions: boolean;

  @IsString()
  grading_type: string;

  @IsOptional()
  @IsNumber()
  grading_standard_id?: number;

  @IsBoolean()
  published: boolean;

  @IsBoolean()
  unpublishable: boolean;

  @IsBoolean()
  only_visible_to_overrides: boolean;

  @IsBoolean()
  locked_for_user: boolean;

  @IsOptional()
  lock_info?: any;

  @IsOptional()
  @IsString()
  lock_explanation?: string;

  @IsOptional()
  @IsNumber()
  quiz_id?: number;

  @IsBoolean()
  anonymous_submissions: boolean;

  @IsBoolean()
  anonymous_grading: boolean;

  @IsOptional()
  @IsNumber()
  anonymous_instructor_annotations?: boolean;

  @IsBoolean()
  omit_from_final_grade: boolean;

  @IsBoolean()
  moderated_grading: boolean;

  @IsOptional()
  @IsNumber()
  grader_count?: number;

  @IsOptional()
  @IsNumber()
  final_grader_id?: number;

  @IsBoolean()
  grader_comments_visible_to_graders: boolean;

  @IsBoolean()
  graders_anonymous_to_graders: boolean;

  @IsBoolean()
  grader_names_visible_to_final_grader: boolean;

  @IsBoolean()
  anonymous_grader_identities_hidden_from_students: boolean;

  @IsOptional()
  @IsNumber()
  allowed_attempts?: number;

  @IsBoolean()
  annotatable_attachment_id: boolean;

  @IsBoolean()
  hide_in_gradebook: boolean;

  @IsBoolean()
  secure_params: boolean;

  @IsOptional()
  @IsString()
  lti_context_id?: string;

  @IsBoolean()
  course_agnostic: boolean;

  @IsString()
  workflow_state: string;

  @IsOptional()
  @IsString()
  important_dates?: string;

  @IsBoolean()
  muted: boolean;

  @IsString()
  html_url_api: string;

  @IsBoolean()
  use_rubric_for_grading: boolean;

  @IsBoolean()
  free_form_criterion_comments: boolean;

  @IsOptional()
  rubric?: any[];

  @IsOptional()
  rubric_settings?: any;
}
