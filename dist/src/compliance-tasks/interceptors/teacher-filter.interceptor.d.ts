import { StudentLPEnrollmentEntity } from 'src/enrollment/entities/student-enrollment.entity';
import { AttachUserIdInterceptor } from '../../core/interceptors/attach-user-id.interceptor';
export declare class TeacherFilterInterceptor extends AttachUserIdInterceptor<StudentLPEnrollmentEntity> {
    constructor();
}
