import { Observable } from 'rxjs';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

interface QueryParamMapping {
  [sourceParam: string]: string; 
}

@Injectable()
export class QueryParamMapperInterceptor implements NestInterceptor {
  private paramMapping: QueryParamMapping = {};

  constructor(paramMapping: QueryParamMapping) {
    this.paramMapping = paramMapping;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const query = request.query;

    Object.entries(this.paramMapping).forEach(([sourceParam, targetParam]) => {
      if (query.hasOwnProperty(sourceParam)) {
        const value = query[sourceParam];

        delete query[sourceParam];

        query[targetParam] = value;
      }
    });

    return next.handle();
  }
}
