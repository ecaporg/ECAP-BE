import { ErrorResponse } from '../exceptions/application.exception';
export declare class ErrorResponseDto implements ErrorResponse {
    error: string;
    timestamp: string;
    message: string;
    details?: Record<string, any>;
}
