import { Strategy } from 'passport-local';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ForbiddenException } from 'src/core';

import { AuthService } from '../services/auth.service';
import { AuthUser } from '../types/auth-user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<AuthUser> {
    const user = await this.authService.validateUserEmailPassword(
      email,
      password,
    );
    if (!user) {
      throw new ForbiddenException('User not valid');
    }
    return user;
  }
}

