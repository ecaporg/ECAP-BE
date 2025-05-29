import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CanvasEnrollmentGradesDto {
  @IsOptional()
  @IsString()
  html_url?: string;

  @IsOptional()
  @IsNumber()
  current_score?: number;

  @IsOptional()
  @IsString()
  current_grade?: string;

  @IsOptional()
  @IsNumber()
  final_score?: number;

  @IsOptional()
  @IsString()
  final_grade?: string;
}

export class CanvasEnrollmentUserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  sortable_name: string;

  @IsString()
  short_name: string;
}

export class CanvasEnrollmentDto {
  @IsNumber()
  id: number;

  @IsNumber()
  course_id: number;

  @IsOptional()
  @IsString()
  sis_course_id?: string;

  @IsOptional()
  @IsString()
  course_integration_id?: string;

  @IsNumber()
  course_section_id: number;

  @IsOptional()
  @IsString()
  section_integration_id?: string;

  @IsOptional()
  @IsString()
  sis_account_id?: string;

  @IsOptional()
  @IsString()
  sis_section_id?: string;

  @IsOptional()
  @IsString()
  sis_user_id?: string;

  @IsString()
  enrollment_state: string;

  @IsBoolean()
  limit_privileges_to_course_section: boolean;

  @IsOptional()
  @IsNumber()
  sis_import_id?: number;

  @IsNumber()
  root_account_id: number;

  @IsString()
  type: string;

  @IsNumber()
  user_id: number;

  @IsOptional()
  @IsNumber()
  associated_user_id?: number;

  @IsString()
  role: string;

  @IsNumber()
  role_id: number;

  @IsString()
  created_at: string;

  @IsString()
  updated_at: string;

  @IsOptional()
  @IsString()
  start_at?: string;

  @IsOptional()
  @IsString()
  end_at?: string;

  @IsOptional()
  @IsString()
  last_activity_at?: string;

  @IsOptional()
  @IsString()
  last_attended_at?: string;

  @IsOptional()
  @IsNumber()
  total_activity_time?: number;

  @IsOptional()
  @IsString()
  html_url?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CanvasEnrollmentGradesDto)
  grades?: CanvasEnrollmentGradesDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CanvasEnrollmentUserDto)
  user?: CanvasEnrollmentUserDto;

  @IsOptional()
  @IsString()
  override_grade?: string;

  @IsOptional()
  @IsNumber()
  override_score?: number;

  @IsOptional()
  @IsString()
  unposted_current_grade?: string;

  @IsOptional()
  @IsString()
  unposted_final_grade?: string;

  @IsOptional()
  @IsString()
  unposted_current_score?: string;

  @IsOptional()
  @IsString()
  unposted_final_score?: string;

  @IsOptional()
  @IsBoolean()
  has_grading_periods?: boolean;

  @IsOptional()
  @IsBoolean()
  totals_for_all_grading_periods_option?: boolean;

  @IsOptional()
  @IsString()
  current_grading_period_title?: string;

  @IsOptional()
  @IsNumber()
  current_grading_period_id?: number;

  @IsOptional()
  @IsString()
  current_period_override_grade?: string;

  @IsOptional()
  @IsNumber()
  current_period_override_score?: number;

  @IsOptional()
  @IsNumber()
  current_period_unposted_current_score?: number;

  @IsOptional()
  @IsNumber()
  current_period_unposted_final_score?: number;

  @IsOptional()
  @IsString()
  current_period_unposted_current_grade?: string;

  @IsOptional()
  @IsString()
  current_period_unposted_final_grade?: string;
}
