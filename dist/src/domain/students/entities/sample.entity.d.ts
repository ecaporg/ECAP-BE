import { SampleFlagCategory, SampleStatus } from 'ecap-lib/dist/constants';
import { ISample } from 'ecap-lib/dist/domain';
import { Relation } from 'typeorm';
import { UserEntity } from '../../../auth/entities/user.entity';
import { CanvasGenericEntity } from '../../../core';
import { StudentLPEnrollmentAssignmentEntity } from '../../enrollment/entities/student-enrollment-assignment.entity';
import { SampleFlagCompletedEntity, SampleFlagErrorEntity, SampleFlagMissingWorkEntity, SampleFlagRejectedEntity } from './sample-flag.entity';
export { SampleStatus, SampleFlagCategory };
export declare class SampleEntity extends CanvasGenericEntity implements ISample {
    status: SampleStatus;
    flag_category: SampleFlagCategory;
    done_by_id: number;
    grade?: string;
    date?: Date;
    preview_url?: string;
    done_by: Relation<UserEntity>;
    flag_errors: Relation<SampleFlagErrorEntity>;
    flag_missing_work: Relation<SampleFlagMissingWorkEntity>;
    flag_rejected: Relation<SampleFlagRejectedEntity>;
    flag_completed: Relation<SampleFlagCompletedEntity>;
    student_lp_enrollment_assignment: Relation<StudentLPEnrollmentAssignmentEntity>;
}
