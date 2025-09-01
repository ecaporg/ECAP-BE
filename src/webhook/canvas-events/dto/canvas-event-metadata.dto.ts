import { IsOptional, IsString } from 'class-validator';

export class CanvasEventMetadataDto {
  @IsString()
  client_ip: string;

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

  @IsString()
  event_name: string;

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

  @IsOptional()
  @IsString()
  time_zone?: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  user_account_id?: string;

  @IsString()
  user_agent: string;

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
