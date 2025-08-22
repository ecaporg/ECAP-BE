"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = exports.UnauthorizedException = exports.BadRequestException = exports.NotFoundException = exports.ApplicationException = void 0;
const common_1 = require("@nestjs/common");
class ApplicationException extends common_1.HttpException {
    constructor(message, statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR, details) {
        const response = {
            message,
            details,
        };
        super(response, statusCode);
    }
}
exports.ApplicationException = ApplicationException;
class NotFoundException extends ApplicationException {
    constructor(message = 'Resource not found', details) {
        super(message, common_1.HttpStatus.NOT_FOUND, details);
    }
}
exports.NotFoundException = NotFoundException;
class BadRequestException extends ApplicationException {
    constructor(message = 'Bad request', details) {
        super(message, common_1.HttpStatus.BAD_REQUEST, details);
    }
}
exports.BadRequestException = BadRequestException;
class UnauthorizedException extends ApplicationException {
    constructor(message = 'Unauthorized', details) {
        super(message, common_1.HttpStatus.UNAUTHORIZED, details);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ForbiddenException extends ApplicationException {
    constructor(message = 'Forbidden', details) {
        super(message, common_1.HttpStatus.FORBIDDEN, details);
    }
}
exports.ForbiddenException = ForbiddenException;
//# sourceMappingURL=application.exception.js.map