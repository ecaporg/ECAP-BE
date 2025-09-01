import { OmitType } from '@nestjs/swagger';

import { UserEntity } from '../../domain/users/entities/user.entity';

export class AuthUser extends OmitType(UserEntity, [
  'password',
  'refreshToken',
]) {}

export interface IAuthUserRefreshToken extends AuthUser {
  refreshToken: string;
}
