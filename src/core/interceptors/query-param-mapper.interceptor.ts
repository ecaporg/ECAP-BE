import { Observable } from 'rxjs';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { SortDirectionEnum } from '../constants';

interface QueryParamMapping {
  [sourceParam: string]: string;
}

interface ExtendedQueryParamMapping {
  sortBy?: string;
  sortDirection?: SortDirectionEnum;
}

@Injectable()
export class QueryParamMapperInterceptor<T extends QueryParamMapping>
  implements NestInterceptor<T, any>
{
  private paramMapping: T;
  private defaultValues: Partial<T & ExtendedQueryParamMapping>;

  constructor(
    paramMapping: T,
    defaultValues: Partial<T & ExtendedQueryParamMapping> = {},
  ) {
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
