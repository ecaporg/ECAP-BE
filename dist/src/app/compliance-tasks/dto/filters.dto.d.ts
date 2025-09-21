import { BaseFilterDto } from '../../../core';
declare const FILTER_KEYS: {
    LEARNING_PERIOD_ID: "learning_period_id";
    ACADEMY_ID: "student.academy_id";
    SCHOOL_ID: "student.school_id";
    TRACK_ID: "learning_period.track_id";
    STUDENT_GRADE: "student_grade";
    COMPLETED: "completed";
    TEACHER_ID: "teacher_enrollments.teacher_id";
    STATUS: "assignments.sample.status";
    STUDENT_ID: "student_id";
    DONE_BY_ID: "assignments.sample.done_by_id";
    ACADEMIC_YEAR: "teacher_enrollments.academic_year_id";
    SEMESTER_ID: "learning_period.track.semesters.id";
    SUBJECT_ID: "assignments.assignment.course_id";
};
declare const ASSIGNMENT_FILTER_KEYS: {
    LEARNING_PERIOD_ID: "student_lp_enrollment.learning_period_id";
    ACADEMIC_YEAR: "student_lp_enrollment.teacher_enrollments.academic_year_id";
    SEMESTER_ID: "student_lp_enrollment.learning_period.track.semesters.id";
    STATUS: "sample.status";
    STUDENT_ID: "student_lp_enrollment.student_id";
    DONE_BY_ID: "sample.done_by_id";
    SUBJECT_ID: "assignment.course_id";
    ACADEMY_ID: "student_lp_enrollment.student.academy_id";
    SCHOOL_ID: "student_lp_enrollment.student.school_id";
    TRACK_ID: "student_lp_enrollment.learning_period.track_id";
    STUDENT_GRADE: "student_lp_enrollment.student_grade";
    COMPLETED: "student_lp_enrollment.completed";
    TEACHER_ID: "student_lp_enrollment.teacher_enrollments.teacher_id";
};
export declare const filterMapping: {
    LEARNING_PERIOD_ID: "learning_period_id";
    ACADEMY_ID: "student.academy_id";
    SCHOOL_ID: "student.school_id";
    TRACK_ID: "learning_period.track_id";
    STUDENT_GRADE: "student_grade";
    COMPLETED: "completed";
    TEACHER_ID: "teacher_enrollments.teacher_id";
    STATUS: "assignments.sample.status";
    STUDENT_ID: "student_id";
    DONE_BY_ID: "assignments.sample.done_by_id";
    ACADEMIC_YEAR: "teacher_enrollments.academic_year_id";
    SEMESTER_ID: "learning_period.track.semesters.id";
    SUBJECT_ID: "assignments.assignment.course_id";
};
export declare const assignmentFilterMapping: {
    LEARNING_PERIOD_ID: "student_lp_enrollment.learning_period_id";
    ACADEMIC_YEAR: "student_lp_enrollment.teacher_enrollments.academic_year_id";
    SEMESTER_ID: "student_lp_enrollment.learning_period.track.semesters.id";
    STATUS: "sample.status";
    STUDENT_ID: "student_lp_enrollment.student_id";
    DONE_BY_ID: "sample.done_by_id";
    SUBJECT_ID: "assignment.course_id";
    ACADEMY_ID: "student_lp_enrollment.student.academy_id";
    SCHOOL_ID: "student_lp_enrollment.student.school_id";
    TRACK_ID: "student_lp_enrollment.learning_period.track_id";
    STUDENT_GRADE: "student_lp_enrollment.student_grade";
    COMPLETED: "student_lp_enrollment.completed";
    TEACHER_ID: "student_lp_enrollment.teacher_enrollments.teacher_id";
};
export declare class StudentsTableFilterDto extends BaseFilterDto {
    [FILTER_KEYS.LEARNING_PERIOD_ID]: number[];
    [FILTER_KEYS.ACADEMY_ID]?: number[];
    [FILTER_KEYS.SCHOOL_ID]?: number[];
    [FILTER_KEYS.TRACK_ID]?: number[];
    [FILTER_KEYS.STUDENT_GRADE]?: string[];
    [FILTER_KEYS.COMPLETED]?: boolean[];
    [FILTER_KEYS.TEACHER_ID]?: number;
}
export declare class StudentSamplesFilterDto extends BaseFilterDto {
    [FILTER_KEYS.LEARNING_PERIOD_ID]: number[];
    [FILTER_KEYS.STATUS]?: string[];
    [FILTER_KEYS.TEACHER_ID]?: number[];
    [FILTER_KEYS.STUDENT_ID]?: number[];
    [FILTER_KEYS.DONE_BY_ID]?: number[];
    [FILTER_KEYS.ACADEMY_ID]?: number[];
}
export declare class TeachersTableFilterDto extends BaseFilterDto {
    [ASSIGNMENT_FILTER_KEYS.ACADEMY_ID]?: number[];
    [ASSIGNMENT_FILTER_KEYS.SCHOOL_ID]?: number[];
    [ASSIGNMENT_FILTER_KEYS.TRACK_ID]?: number[];
    [ASSIGNMENT_FILTER_KEYS.STUDENT_GRADE]?: string[];
    [ASSIGNMENT_FILTER_KEYS.COMPLETED]?: boolean[];
    [ASSIGNMENT_FILTER_KEYS.TEACHER_ID]?: number;
    [ASSIGNMENT_FILTER_KEYS.LEARNING_PERIOD_ID]?: number[];
    [ASSIGNMENT_FILTER_KEYS.ACADEMIC_YEAR]?: number[];
    [ASSIGNMENT_FILTER_KEYS.SEMESTER_ID]?: number[];
    [ASSIGNMENT_FILTER_KEYS.STATUS]?: string[];
    [ASSIGNMENT_FILTER_KEYS.SUBJECT_ID]?: number[];
}
export {};
