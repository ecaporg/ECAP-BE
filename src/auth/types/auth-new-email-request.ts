import { UserEntity } from 'src/users/entities/user.entity';

export interface IAuthNewEmailRequest extends Request {
  user: UserEntity & { newEmail: string };
}

