import { ErrorResponse } from 'ecap-lib/dist/types';
export declare class ErrorResponseDto implements ErrorResponse {
    error: string;
    timestamp: string;
    message: string;
    details?: Record<string, any>;
}
