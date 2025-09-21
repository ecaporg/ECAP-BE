import { AttachUserIdInterceptor } from '../../../core/interceptors/attach-user-id.interceptor';
import { StudentLPEnrollmentEntity } from '../../../domain/enrollment/entities/student-enrollment.entity';
export declare class TeacherFilterInterceptor extends AttachUserIdInterceptor<StudentLPEnrollmentEntity> {
    constructor();
}
