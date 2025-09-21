import { Repository } from 'typeorm';
import { BaseService } from '../../core';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';
export declare class UsersService extends BaseService<UserEntity> {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    createUser(createUserDto: CreateUserDTO): Promise<UserEntity>;
    countUsers(): Promise<number>;
    findUserByEmail(email: string): Promise<UserEntity | null>;
    findUserById(userId: number): Promise<UserEntity | null>;
    updateUser(id: number, updateUserDTO: UpdateUserDTO): Promise<UserEntity>;
    updatePassword(id: number, newPassword: string): Promise<void>;
    markEmailAsVerified(email: string): Promise<void>;
}
