import { SampleEntity, SampleStatus } from '../entities/sample.entity';
interface SampleInterface extends SampleEntity {
}
export declare class CreateSampleDto implements Partial<SampleInterface> {
    assignment_title: string;
    status?: SampleStatus;
    student_lp_enrollment_id: number;
    subject_id: number;
    done_by_id: number;
    grade?: string;
    date?: Date;
}
declare const UpdateSampleDto_base: import("@nestjs/common").Type<Partial<CreateSampleDto>>;
export declare class UpdateSampleDto extends UpdateSampleDto_base {
}
export declare class CreateSampleFlagErrorDto {
    comment: string;
}
export declare class CreateSampleFlagMissingWorkDto {
    reason: string;
}
export declare class CreateSampleFlagRejectedDto {
    reason: string;
}
export declare class CreateSampleFlagCompletedDto {
    message: string;
}
export {};
