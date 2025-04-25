import { Module } from '@nestjs/common';

import { AuthController } from './controllers/auth.controller';
import { AuthEmailController } from './controllers/auth-email.controller';
import { AuthService } from './services/auth.service';
import { AuthEmailService } from './services/auth-email.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtForgotPasswordStrategy } from './strategies/jwt-forgot-password.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { EmailAvailableConstraint } from './validations/email-available';
import commonImports from './common-imports';

@Module({
  imports: [...commonImports],
  providers: [
    AuthService,
    LocalStrategy,
    AuthEmailService,
    JwtStrategy,
    JwtRefreshStrategy,
    JwtForgotPasswordStrategy,
    EmailAvailableConstraint,
  ],
  controllers: [AuthController, AuthEmailController],
})
export class AuthModule {}
