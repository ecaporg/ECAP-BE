import { EmailDTO } from './dtos/email.dto';
import { AuthEmailService } from './auth-email.service';
export declare class AuthEmailController {
    private readonly authEmailService;
    constructor(authEmailService: AuthEmailService);
    verifyEmail(token: string): Promise<Omit<import("./types/auth-user").IAuthUser, "roles">>;
    resendConfirmationLink({ email }: EmailDTO): Promise<void>;
}
