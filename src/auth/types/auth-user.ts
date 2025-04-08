export interface IAuthUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  isActive: boolean;
  emailVerified: boolean;
  role: string;
}

export interface IAuthUserRefreshToken extends IAuthUser {
  refreshToken: string;
}

export class AuthUser implements IAuthUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  isActive: boolean;
  emailVerified: boolean;
  role: string;
}
