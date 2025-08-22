import { Observable } from 'rxjs';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IAuthRequest } from '../../auth/types/auth-request';

export const ROLES_KEY = 'roles';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.extractRoles(context);

    const user = context.switchToHttp().getRequest<IAuthRequest>().user;

    return this.mathRoles(user.role, roles);
  }

  private extractRoles(context: ExecutionContext): string[] {
    const handlerRoles =
      this.reflector.get<string[]>(ROLES_KEY, context.getHandler()) || [];

    const classRoles =
      this.reflector.get<string[]>(ROLES_KEY, context.getClass()) || [];

    return [...handlerRoles, ...classRoles];
  }

  private mathRoles(userRole: string, roles: string[]): boolean {
    if (!roles || roles.length === 0) {
      return true;
    }

    return roles.includes(userRole);
  }
}
