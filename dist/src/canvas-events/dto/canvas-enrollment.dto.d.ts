export declare class CanvasEnrollmentGradesDto {
    html_url?: string;
    current_score?: number;
    current_grade?: string;
    final_score?: number;
    final_grade?: string;
}
export declare class CanvasEnrollmentUserDto {
    id: number;
    name: string;
    sortable_name: string;
    short_name: string;
}
export declare class CanvasEnrollmentDto {
    id: number;
    course_id: number;
    sis_course_id?: string;
    course_integration_id?: string;
    course_section_id: number;
    section_integration_id?: string;
    sis_account_id?: string;
    sis_section_id?: string;
    sis_user_id?: string;
    enrollment_state: string;
    limit_privileges_to_course_section: boolean;
    sis_import_id?: number;
    root_account_id: number;
    type: string;
    user_id: number;
    associated_user_id?: number;
    role: string;
    role_id: number;
    created_at: string;
    updated_at: string;
    start_at?: string;
    end_at?: string;
    last_activity_at?: string;
    last_attended_at?: string;
    total_activity_time?: number;
    html_url?: string;
    grades?: CanvasEnrollmentGradesDto;
    user?: CanvasEnrollmentUserDto;
    override_grade?: string;
    override_score?: number;
    unposted_current_grade?: string;
    unposted_final_grade?: string;
    unposted_current_score?: string;
    unposted_final_score?: string;
    has_grading_periods?: boolean;
    totals_for_all_grading_periods_option?: boolean;
    current_grading_period_title?: string;
    current_grading_period_id?: number;
    current_period_override_grade?: string;
    current_period_override_score?: number;
    current_period_unposted_current_score?: number;
    current_period_unposted_final_score?: number;
    current_period_unposted_current_grade?: string;
    current_period_unposted_final_grade?: string;
}
