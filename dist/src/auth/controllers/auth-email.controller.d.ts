import { EmailDTO } from '../dtos/email.dto';
import { AuthEmailService } from '../services/auth-email.service';
export declare class AuthEmailController {
    private readonly authEmailService;
    constructor(authEmailService: AuthEmailService);
    verifyEmail(token: string): Promise<import("../types/auth-user").AuthUser>;
    resendConfirmationLink({ email }: EmailDTO): Promise<void>;
}
