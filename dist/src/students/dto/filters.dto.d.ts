import { BaseFilterDto } from 'src/core';
declare const FILTER_KEYS: {
    LEARNING_PERIOD_ID: "student_lp_enrollments.learning_period_id";
    TEACHER_ID: "student_lp_enrollments.teacher_school_year_enrollment.teacher_id";
    ACADEMY_ID: "student_lp_enrollments.student.academy_id";
    ACADEMIC_YEAR: "student_lp_enrollments.teacher_school_year_enrollment.academic_year_id";
    STATUS: "status";
    FLAG_CATEGORY: "flag_category";
};
export declare class FlaggedSamplesFilterDto extends BaseFilterDto {
    [FILTER_KEYS.LEARNING_PERIOD_ID]: number[];
    [FILTER_KEYS.TEACHER_ID]?: number;
    [FILTER_KEYS.ACADEMY_ID]?: number[];
    [FILTER_KEYS.ACADEMIC_YEAR]?: number;
    [FILTER_KEYS.STATUS]?: string[];
    [FILTER_KEYS.FLAG_CATEGORY]?: string[];
}
export {};
