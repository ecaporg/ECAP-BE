export class CanvasSubmissionDto {
  id: number;
  assignment_id: number;
  assignment?: any;
  course?: any;
  attempt: number;
  body?: string;
  grade?: string;
  grade_matches_current_submission: boolean;
  html_url: string;
  preview_url: string;
  score?: number;
  submission_comments?: any[];
  submission_type?: string;
  submitted_at?: string;
  url?: string;
  user_id: number;
  grader_id?: number;
  graded_at?: string;
  user?: any;
  late: boolean;
  assignment_visible: boolean;
  excused?: boolean;
  missing?: boolean;
  late_policy_status?: string;
  points_deducted?: number;
  seconds_late?: number;
  workflow_state: string;
  extra_attempts?: number;
  anonymous_id?: string;
}

export class CanvasSubmissionEventDto {
  metadata: {
    event_name: string;
    event_time: string;
    hostname: string;
    user_account_id: string;
    user_agent: string;
    user_id: string;
    context_id: string;
  };
  body: {
    assignment_id: string;
    attempt: number;
    body: string;
    grade: string;
    graded_at: string;
    group_id: string;
    late: boolean;
    lti_assignment_id: string;
    lti_user_id: string | null;
    missing: boolean;
    score: number;
    submission_id: string;
    submission_type: string;
    submitted_at: string;
    updated_at: string;
    url: string | null;
    user_id: string;
    workflow_state: string;
  };
}
