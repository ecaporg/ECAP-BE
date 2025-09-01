import { UserEntity } from '../../domain/users/entities/user.entity';

export interface IAuthNewEmailRequest extends Request {
  user: UserEntity & { newEmail: string };
}
