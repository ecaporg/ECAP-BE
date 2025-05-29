import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CanvasUserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  sortable_name: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  short_name?: string;

  @IsOptional()
  @IsString()
  sis_user_id?: string;

  @IsOptional()
  @IsNumber()
  sis_import_id?: number;

  @IsOptional()
  @IsString()
  integration_id?: string;

  @IsOptional()
  @IsString()
  login_id?: string;

  @IsOptional()
  @IsString()
  avatar_url?: string;

  @IsOptional()
  @IsString()
  avatar_state?: string;

  @IsOptional()
  @IsArray()
  enrollments?: any[];

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  locale?: string;

  @IsOptional()
  @IsString()
  last_login?: string;

  @IsOptional()
  @IsString()
  time_zone?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  pronouns?: string;
}
