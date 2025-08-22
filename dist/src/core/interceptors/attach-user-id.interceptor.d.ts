import { Observable } from 'rxjs';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { NestedObjectToDotNotation } from 'src/core';
import { UserEntity } from 'src/users/entities/user.entity';
import { RolesEnum } from 'src/users/enums/roles.enum';
interface RolePathMapping<T extends object> {
    role: RolesEnum;
    path: NestedObjectToDotNotation<T>;
    map?: (user: UserEntity) => any;
}
export declare class AttachUserIdInterceptor<T extends object> implements NestInterceptor<T> {
    private roleMappings;
    constructor(roleMappings: RolePathMapping<T>[]);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
export {};
