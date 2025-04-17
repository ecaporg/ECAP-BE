import { Observable } from 'rxjs';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { RolesEnum } from '@/users/enums/roles.enum';

@Injectable()
export class TeacherFilterInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const query = request.query;

    if (user && user.role === RolesEnum.TEACHER) {
      query['assignment.teacher_id'] = user.id;
    }

    return next.handle();
  }
}
