import { RolesEnum } from '@/users/enums/roles.enum';

export interface IAuthUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  isActive: boolean;
  emailVerified: boolean;
  role: RolesEnum;
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
  role: RolesEnum;
}
