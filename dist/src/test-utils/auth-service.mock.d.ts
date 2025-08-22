import { AuthEmailService } from 'src/auth/services/auth-email.service';
export declare const mockEmailService: () => {
    provide: typeof AuthEmailService;
    useValue: {
        verifyEmailToken: jest.Mock<any, any, any>;
        changeEmail: jest.Mock<any, any, any>;
        resendConfirmationLink: jest.Mock<any, any, any>;
        sendVerificationLink: jest.Mock<string, [], any>;
        sendForgotPasswordLink: jest.Mock<boolean, [], any>;
        sendNewEmailVerificationLink: jest.Mock<boolean, [], any>;
    };
};
