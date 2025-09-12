export class CanvasUserDto {
  id: number;
  name: string;
  sortable_name: string;
  last_name?: string;
  first_name?: string;
  short_name?: string;
  sis_user_id?: string;
  sis_import_id?: number;
  integration_id?: string;
  login_id?: string;
  avatar_url?: string;
  avatar_state?: string;
  enrollments?: any[];
  email?: string;
  locale?: string;
  last_login?: string;
  time_zone?: string;
  bio?: string;
  pronouns?: string;
}
