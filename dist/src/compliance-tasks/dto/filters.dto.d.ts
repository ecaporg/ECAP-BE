import { BaseFilterDto } from 'src/core';
declare const FILTER_KEYS: {
    LEARNING_PERIOD_ID: "learning_period_id";
    ACADEMY_ID: "student.academy_id";
    SCHOOL_ID: "teacher_school_year_enrollment.school_id";
    TRACK_ID: "track_id";
    STUDENT_GRADE: "student_grade";
    COMPLETED: "completed";
    TEACHER_ID: "teacher_school_year_enrollment.teacher_id";
    SAMPLE_STATUS: "samples.status";
    STUDENT_ID: "student_id";
    DONE_BY_ID: "samples.done_by_id";
    ACADEMIC_YEAR: "teacher_school_year_enrollment.academic_year_id";
    SEMESTER_ID: "track.semesters.id";
    SAMPLE_SUBJECT: "samples.subject.id";
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
    [FILTER_KEYS.SAMPLE_STATUS]?: string[];
    [FILTER_KEYS.TEACHER_ID]?: number[];
    [FILTER_KEYS.STUDENT_ID]?: number[];
    [FILTER_KEYS.DONE_BY_ID]?: number[];
    [FILTER_KEYS.ACADEMY_ID]?: number[];
}
declare const TeachersTableFilterDto_base: import("@nestjs/common").Type<Omit<StudentsTableFilterDto, "learning_period_id">>;
export declare class TeachersTableFilterDto extends TeachersTableFilterDto_base {
    [FILTER_KEYS.LEARNING_PERIOD_ID]?: number[];
    [FILTER_KEYS.ACADEMIC_YEAR]?: number[];
    [FILTER_KEYS.SEMESTER_ID]?: number[];
    [FILTER_KEYS.SAMPLE_STATUS]?: string[];
    [FILTER_KEYS.SAMPLE_SUBJECT]?: string[];
}
export {};
