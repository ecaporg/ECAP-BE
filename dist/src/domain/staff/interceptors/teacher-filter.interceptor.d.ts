import { AttachUserIdInterceptor } from '../../../core/interceptors/attach-user-id.interceptor';
import { TeacherEntity } from '../entities/staff.entity';
export declare class TeacherFilterInterceptor extends AttachUserIdInterceptor<TeacherEntity> {
    constructor();
}
