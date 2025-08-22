import { HttpException, HttpStatus } from '@nestjs/common';

export interface ErrorResponse {
  message: string;
  details?: Record<string, any>;
}

export class ApplicationException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    details?: Record<string, any>,
  ) {
    const response: ErrorResponse = {
      message,
      details,
    };
    super(response, statusCode);
  }
}

export class NotFoundException extends ApplicationException {
  constructor(
    message: string = 'Resource not found',
    details?: Record<string, any>,
  ) {
    super(message, HttpStatus.NOT_FOUND, details);
  }
}

export class BadRequestException extends ApplicationException {
  constructor(message: string = 'Bad request', details?: Record<string, any>) {
    super(message, HttpStatus.BAD_REQUEST, details);
  }
}

export class UnauthorizedException extends ApplicationException {
  constructor(message: string = 'Unauthorized', details?: Record<string, any>) {
    super(message, HttpStatus.UNAUTHORIZED, details);
  }
}

export class ForbiddenException extends ApplicationException {
  constructor(message: string = 'Forbidden', details?: Record<string, any>) {
    super(message, HttpStatus.FORBIDDEN, details);
  }
}

