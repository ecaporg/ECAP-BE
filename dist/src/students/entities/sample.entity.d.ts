import { GenericEntity } from 'src/core';
import { StudentLPEnrollmentEntity } from 'src/enrollment/entities/student-enrollment.entity';
import { SubjectEntity } from 'src/track/entities/subject.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { SampleFlagCompletedEntity, SampleFlagErrorEntity, SampleFlagMissingWorkEntity, SampleFlagRejectedEntity } from './sample-flag.entity';
export declare enum SampleStatus {
    CREATED = "CREATED",
    COMPLETED = "COMPLETED",
    FLAGGED_TO_ADMIN = "FLAGGED_TO_ADMIN",
    PENDING = "PENDING",
    ERRORS_FOUND = "ERRORS_FOUND",
    MISSING_SAMPLE = "MISSING_SAMPLE",
    REASON_REJECTED = "REASON_REJECTED"
}
export declare enum SampleFlagCategory {
    MISSING_SAMPLE = "MISSING_SAMPLE",
    REASON_REJECTED = "REASON_REJECTED",
    ERROR_IN_SAMPLE = "ERROR_IN_SAMPLE"
}
export declare class SampleEntity extends GenericEntity {
    assignment_title: string;
    status: SampleStatus;
    flag_category: SampleFlagCategory;
    done_by_id: number;
    subject_id?: number;
    grade?: string;
    date?: Date;
    preview_url?: string;
    canvas_submission_id?: number;
    subject: SubjectEntity;
    student_lp_enrollments: StudentLPEnrollmentEntity[];
    done_by: UserEntity;
    flag_errors: SampleFlagErrorEntity;
    flag_missing_work: SampleFlagMissingWorkEntity;
    flag_rejected: SampleFlagRejectedEntity;
    flag_completed: SampleFlagCompletedEntity;
}
