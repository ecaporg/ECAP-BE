import { Observable } from 'rxjs';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { NestedObjectToDotNotation } from '../../core';
import { UserEntity } from '../../auth/entities/user.entity';
import { RolesEnum } from '../../auth/enums/roles.enum';
interface RolePathMapping<T extends object> {
    role: RolesEnum;
    path: NestedObjectToDotNotation<T>;
    map?: (user: UserEntity) => any;
}
export declare class AttachToBodyInterceptor<T extends object> implements NestInterceptor<T> {
    private roleMappings;
    constructor(roleMappings: RolePathMapping<T>[]);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
export {};
