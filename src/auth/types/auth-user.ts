import { OmitType } from '@nestjs/swagger';

import { UserEntity } from 'src/users/entities/user.entity';

export class AuthUser extends OmitType(UserEntity, [
  'password',
  'refreshToken',
]) {}

export interface IAuthUserRefreshToken extends AuthUser {
  refreshToken: string;
}

