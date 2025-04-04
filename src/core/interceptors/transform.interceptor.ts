import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

export interface Response<T> {
  data: T;
  meta?: Record<string, any>;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    // Get the current request
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    return next.handle().pipe(
      map((data) => {
        // If data is already in the expected format, return it as is
        if (data && data.data !== undefined) {
          return data;
        }

        // Handle pagination responses
        if (data && data.items && data.meta) {
          return {
            data: data.items,
            meta: {
              ...data.meta,
              timestamp: new Date().toISOString(),
              path: request.url,
            },
          };
        }

        // Standard transformation
        return {
          data,
          meta: {
            timestamp: new Date().toISOString(),
            path: request.url,
          },
        };
      }),
    );
  }
}
