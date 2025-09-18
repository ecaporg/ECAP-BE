import { UserEntity } from '../entities/user.entity';

export interface IAuthNewEmailRequest extends Request {
  user: UserEntity & { newEmail: string };
}
