import { BaseFilterDto } from 'src/core';
declare const FILTER_KEYS: {
    ADMIN: "track.tenant.admins.id";
    DIRECTOR: "student_lp_enrollments.student.academy_id";
    TEACHER: "student_lp_enrollments.teacher_school_year_enrollment.teacher_id";
};
export declare class DashboardFilterDto extends BaseFilterDto {
    [FILTER_KEYS.DIRECTOR]?: number;
    [FILTER_KEYS.ADMIN]?: number;
    [FILTER_KEYS.TEACHER]?: number;
}
export {};
