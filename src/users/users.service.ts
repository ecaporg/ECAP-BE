import { ILike, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@/core/services/base.service';

import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  async createUser(createUserDto: CreateUserDTO): Promise<UserEntity> {
    return this.create({
      ...createUserDto,
      email: createUserDto.email.toLowerCase(),
    });
  }

  countUsers(): Promise<number> {
    return this.repository.count();
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.findOneBy({
      // ignore case
      email: ILike(`%${email}%`),
    });
  }

  findUserById(userId: number): Promise<UserEntity | null> {
    return this.findOne(userId).catch(() => null);
  }

  async updateUser(
    id: number,
    updateUserDTO: UpdateUserDTO,
  ): Promise<UserEntity> {
    return this.update(id, updateUserDTO);
  }

  async updatePassword(id: number, newPassword: string): Promise<void> {
    await this.update(id, { password: newPassword });
  }

  async markEmailAsVerified(email: string): Promise<void> {
    await this.repository.update(
      { email },
      {
        emailVerified: true,
      },
    );
  }
}
