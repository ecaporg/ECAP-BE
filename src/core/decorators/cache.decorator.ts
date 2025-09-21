import { UseInterceptors } from '@nestjs/common';

import { RoleCacheInterceptor } from '../interceptors/role-cache.interceptor';
export const RoleCache = () => UseInterceptors(RoleCacheInterceptor);
