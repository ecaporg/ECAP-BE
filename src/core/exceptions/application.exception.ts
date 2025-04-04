import { HttpException, HttpStatus } from '@nestjs/common';

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  details?: Record<string, any>;
  errorCode?: string;
}

export class ApplicationException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    error: string = 'Internal Server Error',
    details?: Record<string, any>,
    errorCode?: string,
  ) {
    const response: ErrorResponse = {
      statusCode,
      message,
      error,
      details,
      errorCode,
    };
    super(response, statusCode);
  }
}

export class NotFoundException extends ApplicationException {
  constructor(
    message: string = 'Resource not found',
    details?: Record<string, any>,
    errorCode?: string,
  ) {
    super(message, HttpStatus.NOT_FOUND, 'Not Found', details, errorCode);
  }
}

export class BadRequestException extends ApplicationException {
  constructor(
    message: string = 'Bad request',
    details?: Record<string, any>,
    errorCode?: string,
  ) {
    super(message, HttpStatus.BAD_REQUEST, 'Bad Request', details, errorCode);
  }
}

export class UnauthorizedException extends ApplicationException {
  constructor(
    message: string = 'Unauthorized',
    details?: Record<string, any>,
    errorCode?: string,
  ) {
    super(message, HttpStatus.UNAUTHORIZED, 'Unauthorized', details, errorCode);
  }
}

export class ForbiddenException extends ApplicationException {
  constructor(
    message: string = 'Forbidden',
    details?: Record<string, any>,
    errorCode?: string,
  ) {
    super(message, HttpStatus.FORBIDDEN, 'Forbidden', details, errorCode);
  }
}
