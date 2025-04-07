"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockEmailService = void 0;
const auth_email_service_1 = require("../auth/auth-email.service");
const mockEmailService = () => {
    const authEmailService = {
        provide: auth_email_service_1.AuthEmailService,
        useValue: {
            verifyEmailToken: jest.fn(),
            changeEmail: jest.fn(),
            resendConfirmationLink: jest.fn(),
            sendVerificationLink: jest.fn(() => {
                return 'some-mock';
            }),
            sendForgotPasswordLink: jest.fn(() => true),
            sendNewEmailVerificationLink: jest.fn(() => true),
        },
    };
    return authEmailService;
};
exports.mockEmailService = mockEmailService;
//# sourceMappingURL=auth-service.mock.js.map