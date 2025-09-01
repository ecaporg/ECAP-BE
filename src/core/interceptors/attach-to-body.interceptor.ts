import { Observable } from 'rxjs';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { NestedObjectToDotNotation } from '../../core';
import { UserEntity } from '../../domain/users/entities/user.entity';
import { RolesEnum } from '../../domain/users/enums/roles.enum';

interface RolePathMapping<T extends object> {
  role: RolesEnum;
  path: NestedObjectToDotNotation<T>;
  map?: (user: UserEntity) => any;
}

@Injectable()
export class AttachToBodyInterceptor<T extends object>
  implements NestInterceptor<T>
{
  private roleMappings: RolePathMapping<T>[] = [];

  constructor(roleMappings: RolePathMapping<T>[]) {
    this.roleMappings = roleMappings;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const body = request.body;

    if (user && user.id) {
      for (const mapping of this.roleMappings) {
        if (user && user.role === mapping.role) {
          body[mapping.path as string] = mapping.map
            ? mapping.map(user)
            : user.id;
        }
      }
    }

    return next.handle();
  }
}
