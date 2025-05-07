import { Request } from 'express';

import { AuthUser } from './auth-user';

export interface IAuthRequest extends Request {
  user: AuthUser;
}

export interface IAuthRefreshRequest extends Request {
  user: AuthUser & { refreshToken: string };
}
