import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiErrorResponses } from 'src/core';

import { EmailDTO } from '../dtos/email.dto';
import { AuthEmailService } from '../services/auth-email.service';

@ApiTags('Authentication - email')
@Controller('auth/email')
export class AuthEmailController {
  constructor(private readonly authEmailService: AuthEmailService) {}

  @Get('verify')
  @ApiOperation({ summary: 'Verify email with token' })
  @ApiResponse({ status: 200, description: 'Email successfully verified' })
  @ApiErrorResponses()
  verifyEmail(@Query('token') token: string) {
    return this.authEmailService.verifyEmailToken(token);
  }

  @Post('resend-confirmation-link')
  @ApiOperation({ summary: 'Resend email confirmation link' })
  @ApiResponse({ status: 200, description: 'Confirmation link sent' })
  @ApiErrorResponses()
  resendConfirmationLink(@Body() { email }: EmailDTO) {
    return this.authEmailService.resendConfirmationLink(email);
  }

  // @AccountVerified('jwt-change-email')
  // @Get('verify-new-email')
  // changeEmail(@Req() { user }: IAuthNewEmailRequest) {
  //   return this.authEmailService.changeEmail(user.id, user.newEmail);
  // }
}

