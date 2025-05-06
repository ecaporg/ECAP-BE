import { Observable } from 'rxjs';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { NestedObjectToDotNotation } from '@/core';
import { RolesEnum } from '@/users/enums/roles.enum';

interface RolePathMapping<T extends object> {
  role: RolesEnum;
  path: NestedObjectToDotNotation<T>;
}

@Injectable()
export class AttachUserIdInterceptor<T extends object>
  implements NestInterceptor<T>
{
  private roleMappings: RolePathMapping<T>[] = [];

  constructor(roleMappings: RolePathMapping<T>[]) {
    this.roleMappings = roleMappings;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const query = request.query;

    if (user && user.id) {
      for (const mapping of this.roleMappings) {
        if (user && user.role === mapping.role) {
          query[mapping.path as string] = user.id;
        }
      }
    }

    return next.handle();
  }
}
