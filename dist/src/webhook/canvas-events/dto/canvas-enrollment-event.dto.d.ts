export declare class CanvasEnrollmentEventMetadataDto {
    client_ip: string;
    context_account_id: string;
    context_id: string;
    context_sis_source_id?: string;
    context_type: string;
    developer_key_id?: string;
    event_name: string;
    event_time: string;
    hostname: string;
    http_method: string;
    producer: string;
    referrer?: string;
    request_id: string;
    root_account_id: string;
    root_account_lti_guid?: string;
    root_account_uuid?: string;
    session_id?: string;
    time_zone: string;
    url: string;
    user_account_id: string;
    user_agent?: string;
    user_id: string;
    user_login: string;
    user_sis_id?: string;
}
export declare class CanvasEnrollmentEventBodyDto {
    associated_user_id?: string;
    course_id: string;
    course_section_id: string;
    created_at: string;
    enrollment_id: string;
    limit_privileges_to_course_section: boolean;
    type: string;
    updated_at: string;
    user_id: string;
    user_name: string;
    workflow_state: string;
}
export declare class CanvasEnrollmentEventDto {
    metadata: CanvasEnrollmentEventMetadataDto;
    body: CanvasEnrollmentEventBodyDto;
}
