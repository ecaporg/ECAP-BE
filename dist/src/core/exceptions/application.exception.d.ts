import { HttpException, HttpStatus } from '@nestjs/common';
export interface ErrorResponse {
    message: string;
    details?: Record<string, any>;
}
export declare class ApplicationException extends HttpException {
    constructor(message: string, statusCode?: HttpStatus, details?: Record<string, any>);
}
export declare class NotFoundException extends ApplicationException {
    constructor(message?: string, details?: Record<string, any>);
}
export declare class BadRequestException extends ApplicationException {
    constructor(message?: string, details?: Record<string, any>);
}
export declare class UnauthorizedException extends ApplicationException {
    constructor(message?: string, details?: Record<string, any>);
}
export declare class ForbiddenException extends ApplicationException {
    constructor(message?: string, details?: Record<string, any>);
}
