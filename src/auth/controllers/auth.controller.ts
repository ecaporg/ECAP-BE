import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ApiCrudResponse, ApiErrorResponses, CurrentUser } from '../../core';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { AccountVerified } from '../decorators/account-verified';
import { AuthTokensDTO } from '../dtos/auth-tokens.dto';
import { EmailDTO } from '../dtos/email.dto';
import { LoginResponseDTO } from '../dtos/login-response.dto';
import { PasswordDTO } from '../dtos/password.dto';
import { ResetPasswordDTO } from '../dtos/reset-password.dto';
import { SignInDTO } from '../dtos/sign-in.dto';
import { AuthService } from '../services/auth.service';
import { AuthUser } from '../types/auth-user';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Get('/restore-password')
  // @Render('restore-password')
  // renderRestorePassword(@Query('token') token: string) {
  //   return { token };
  // }
  @Post('sign-up')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCrudResponse(AuthUser, 'created')
  signUp(@Body() createUserDto: CreateUserDTO): Promise<AuthUser> {
    return this.authService.signUp(createUserDto);
  }

  @ApiBody({ type: SignInDTO })
  @AccountVerified('local')
  @Post('sign-in')
  @ApiOperation({ summary: 'Authenticate user with credentials' })
  @ApiCrudResponse(LoginResponseDTO)
  signIn(@CurrentUser() user: AuthUser): Promise<LoginResponseDTO> {
    return this.authService.signIn(user);
  }

  @AccountVerified('jwt-refresh')
  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh authentication tokens' })
  @ApiCrudResponse(AuthTokensDTO)
  refreshToken(
    @CurrentUser('id') userId: number,
    @CurrentUser('refreshToken') refreshToken: string,
  ): Promise<AuthTokensDTO> {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset link' })
  @ApiResponse({ status: 200, description: 'Password reset link sent' })
  @ApiErrorResponses()
  sendForgotPasswordLink(@Body() { email }: EmailDTO) {
    return this.authService.forgotPassword(email);
  }

  @ApiBearerAuth()
  @AccountVerified('jwt')
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset user password' })
  @ApiResponse({ status: 200, description: 'Password successfully reset' })
  @ApiErrorResponses()
  resetPassword(
    @CurrentUser('id') userId: number,
    @Body() resetPasswordDTO: ResetPasswordDTO,
  ) {
    return this.authService.resetPassword(userId, resetPasswordDTO);
  }

  @AccountVerified('jwt-forgot-password')
  @Post('change-forgotten-password')
  @ApiOperation({ summary: 'Change password using reset token' })
  @ApiResponse({ status: 200, description: 'Password successfully changed' })
  @ApiErrorResponses()
  changeForgottenPassword(
    @CurrentUser('id') userId: number,
    @Body() { password }: PasswordDTO,
  ) {
    return this.authService.changePassword(userId, password);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiOperation({ summary: 'Get current user' })
  @ApiCrudResponse(UserEntity)
  getMe(@CurrentUser() user: UserEntity) {
    return user;
  }

  // @ApiBearerAuth()
  // @AccountVerified('jwt')
  // @Post('change-email')
  // confirmNewEmail(
  //   @Req() { user }: IAuthRequest,
  //   @Body() changeEmailPasswordDTO: ChangeEmailPasswordDTO,
  // ) {
  //   return this.authService.handleEmailUpdate(user.id, changeEmailPasswordDTO);
  // }
}
