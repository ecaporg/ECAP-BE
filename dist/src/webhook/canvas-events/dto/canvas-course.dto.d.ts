export declare class CanvasCourseDto {
    id: number;
    name: string;
    account_id?: string;
    uuid: string;
    start_at: string;
    grading_standard_id?: string;
    is_public: boolean;
    created_at?: string;
    course_code: string;
    default_view: string;
    root_account_id?: number;
    enrollment_term_id?: number;
    license?: string;
    grade_passback_setting?: string;
    end_at?: string;
    public_syllabus: boolean;
    public_syllabus_to_auth?: string;
    storage_quota_mb?: number;
    is_public_to_auth_users: boolean;
    homeroom_course: boolean;
    course_color?: string;
    friendly_name?: string;
    apply_assignment_group_weights: boolean;
    calendar?: any;
    time_zone: string;
    blueprint: boolean;
    blueprint_restrictions?: any;
    blueprint_restrictions_by_object_type?: any;
    template?: boolean;
    enrollments: any[];
    hide_final_grades: boolean;
    workflow_state: string;
    restrict_enrollments_to_course_dates: boolean;
    overridden_course_visibility?: string;
}
export declare class CanvasCourseEventDto {
    metadata: {
        event_name: string;
    };
    body: {
        course_id: string;
        created_at: string;
        name: string;
        updated_at: string;
        uuid: string;
        workflow_state: string;
        published: boolean;
    };
}
