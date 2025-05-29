import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CanvasCourseDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  account_id?: string;

  @IsString()
  uuid: string;

  @IsString()
  start_at: string;

  @IsOptional()
  @IsString()
  grading_standard_id?: string;

  @IsBoolean()
  is_public: boolean;

  @IsOptional()
  @IsString()
  created_at?: string;

  @IsString()
  course_code: string;

  @IsString()
  default_view: string;

  @IsOptional()
  @IsNumber()
  root_account_id?: number;

  @IsOptional()
  @IsNumber()
  enrollment_term_id?: number;

  @IsOptional()
  @IsString()
  license?: string;

  @IsOptional()
  @IsNumber()
  grade_passback_setting?: string;

  @IsOptional()
  @IsString()
  end_at?: string;

  @IsBoolean()
  public_syllabus: boolean;

  @IsOptional()
  @IsString()
  public_syllabus_to_auth?: string;

  @IsOptional()
  @IsNumber()
  storage_quota_mb?: number;

  @IsBoolean()
  is_public_to_auth_users: boolean;

  @IsBoolean()
  homeroom_course: boolean;

  @IsOptional()
  @IsString()
  course_color?: string;

  @IsOptional()
  @IsString()
  friendly_name?: string;

  @IsBoolean()
  apply_assignment_group_weights: boolean;

  @IsOptional()
  calendar?: any;

  @IsString()
  time_zone: string;

  @IsBoolean()
  blueprint: boolean;

  @IsOptional()
  blueprint_restrictions?: any;

  @IsOptional()
  blueprint_restrictions_by_object_type?: any;

  @IsOptional()
  template?: boolean;

  @IsArray()
  enrollments: any[];

  @IsBoolean()
  hide_final_grades: boolean;

  @IsString()
  workflow_state: string;

  @IsBoolean()
  restrict_enrollments_to_course_dates: boolean;

  @IsOptional()
  overridden_course_visibility?: string;
}
