import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { RoleEntity } from './entities/role.entity';
import { UserEntity } from './entities/user.entity';
import { UserRoleEntity } from './entities/user-role.entity';
export declare class UsersService {
    private readonly userRepository;
    private readonly userRoleRepository;
    constructor(userRepository: Repository<UserEntity>, userRoleRepository: Repository<UserRoleEntity>);
    createUser(createUserDto: CreateUserDTO): Promise<UserEntity>;
    countUsers(): Promise<number>;
    findUserByEmail(email: string): Promise<UserEntity | null>;
    findUserById(userId: number): Promise<UserEntity | null>;
    updateUser(id: number, updateUserDTO: UpdateUserDTO): Promise<UserEntity>;
    updatePassword(id: number, newPassword: string): Promise<void>;
    markEmailAsVerified(email: any): Promise<void>;
    getUserRoles(userId: number): Promise<Omit<RoleEntity, 'createdAt' | 'updatedAt' | 'userRoles'>[]>;
}
