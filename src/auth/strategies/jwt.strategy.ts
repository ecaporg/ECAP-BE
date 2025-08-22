import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ForbiddenException } from 'src/core';

import { AuthService } from '../services/auth.service';
import { AuthUser } from '../types/auth-user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }

  async validate({ id }: AuthUser) {
    try {
      return await this.authService.validateUserById(id);
    } catch (error) {
      throw new ForbiddenException('User not valid', error);
    }
  }
}

