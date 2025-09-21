import { BaseFilterDto } from '../../../core';
declare const FILTER_KEYS: {
    LEARNING_PERIOD_ID: "student_lp_enrollment_assignment.student_lp_enrollment.learning_period_id";
    TEACHER_ID: "student_lp_enrollment_assignment.student_lp_enrollment.teacher_enrollments.teacher_id";
    ACADEMY_ID: "student_lp_enrollment_assignment.student_lp_enrollment.student.academy_id";
    ACADEMIC_YEAR: "student_lp_enrollment_assignment.student_lp_enrollment.teacher_enrollments.academic_year_id";
    STATUS: "status";
    FLAG_CATEGORY: "flag_category";
};
export declare const filterMapping: {
    LEARNING_PERIOD_ID: "student_lp_enrollment_assignment.student_lp_enrollment.learning_period_id";
    TEACHER_ID: "student_lp_enrollment_assignment.student_lp_enrollment.teacher_enrollments.teacher_id";
    ACADEMY_ID: "student_lp_enrollment_assignment.student_lp_enrollment.student.academy_id";
    ACADEMIC_YEAR: "student_lp_enrollment_assignment.student_lp_enrollment.teacher_enrollments.academic_year_id";
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
