// import { Cache } from 'cache-manager';

// import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
// import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';

// @Injectable()
// export class RoleCacheInterceptor extends CacheInterceptor {
//   constructor(
//     @Inject(CACHE_MANAGER) cacheManager: Cache,
//     reflector: Reflector,
//   ) {
//     super(cacheManager, reflector);
//   }

//   protected trackBy(context: ExecutionContext): string | undefined {
//     const request = context.switchToHttp().getRequest();
//     const userId = request.user?.id;
//     const res = super.trackBy(context);
//     return userId && res ? `${res}:userId=${userId}` : res;
//   }
// }
export {};
