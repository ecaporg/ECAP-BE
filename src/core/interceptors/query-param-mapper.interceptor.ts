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
export class QueryParamMapperInterceptor<T extends QueryParamMapping>
  implements NestInterceptor<T, any>
{
  private paramMapping: T = {} as T;
  private defaultValues: T = {} as T;

  constructor(paramMapping: T, defaultValues?: T) {
    this.paramMapping = paramMapping;
    this.defaultValues = defaultValues;
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

    Object.entries(this.defaultValues).forEach(([param, defaultValue]) => {
      if (!query.hasOwnProperty(param)) {
        query[param] = defaultValue;
      }
    });

    return next.handle();
  }
}
