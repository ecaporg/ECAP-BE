import { Cache } from 'cache-manager';
import { from, Observable, tap } from 'rxjs';

import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class LoggingCacheInterceptor extends CacheInterceptor {
  private readonly logger = new Logger(LoggingCacheInterceptor.name);

  constructor(
    @Inject(CACHE_MANAGER) cacheManager: Cache,
    reflector: Reflector,
  ) {
    super(cacheManager, reflector);
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const cacheKey = this.trackBy(context);

    this.logger.debug(`Cache check for: ${method} ${url}`);
    this.logger.debug(`Cache key: ${cacheKey}`);

    // Перевіряємо чи є дані в кеші
    const cachedValue = cacheKey ? await this.cacheManager.get(cacheKey) : null;

    if (cachedValue) {
      this.logger.log(`🎯 CACHE HIT: ${method} ${url}`);
      this.logger.debug(`Cached data found for key: ${cacheKey}`);
    } else {
      this.logger.log(
        `🔄 CACHE MISS: ${method} ${url} - fetching from database`,
      );
    }

    // Викликаємо батьківський метод і обробляємо результат
    const result = await super.intercept(context, next);

    return result.pipe(
      tap((data) => {
        if (!cachedValue && cacheKey) {
          this.logger.log(`💾 CACHE STORED: ${method} ${url}`);
          this.logger.debug(`Data cached with key: ${cacheKey}`);
        }
      }),
    );
  }

  protected trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;
    const res = super.trackBy(context);
    return userId && res ? `${res}:userId=${userId}` : res;
  }
}
