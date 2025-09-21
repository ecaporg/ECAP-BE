import { ExecutionContext, SetMetadata, UseInterceptors } from '@nestjs/common';

import { CACHE_KEY_METADATA, CACHE_TTL_METADATA } from '../constants/cache';
import { RoleCacheInterceptor } from '../interceptors/role-cache.interceptor';

export const CacheKey = (key: string) => SetMetadata(CACHE_KEY_METADATA, key);

type CacheTTLFactory = (ctx: ExecutionContext) => Promise<number> | number;
export const CacheTTL = (ttl: number | CacheTTLFactory) =>
  SetMetadata(CACHE_TTL_METADATA, ttl);

export const RoleCache = () => UseInterceptors(RoleCacheInterceptor);
