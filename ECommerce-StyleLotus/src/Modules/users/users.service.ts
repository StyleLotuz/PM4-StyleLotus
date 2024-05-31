import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/Dtos/CreateUser.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getAllUser(page: number, limit: number) {
    const startIndex = (page - 1) * limit;

    try {
      const [users] = await this.usersRepository.findAndCount({
        skip: startIndex,
        take: limit,
      });

      const usersWithoutPasswords = users.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      return usersWithoutPasswords;
    } catch (err) {
      console.error('Error fetching users', err);
      throw new Error('Could not fetch users');
    }
  }

  async getUserById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { orders: true },
    });

    if (!user) throw new NotFoundException('User not found');

    const { password: pass, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  // async createNewUser(userData: CreateUserDto) {
  //   try {
  //     return await this.usersRepository.save(userData);
  //   } catch (err) {
  //     console.error('Error creating user ', err);
  //     throw new Error('Could not create user');
  //   }
  // }

  async modifyUser(id: string, userData: CreateUserDto) {
    try {
      const user = await this.usersRepository.update(id, userData);

      if (!user) throw new NotFoundException('User to update not found');

      return user;
    } catch (err) {
      console.error('Error updating user', err);
      throw new Error('Could not update user');
    }
  }

  async deleteUser(id: string) {
    return await this.usersRepository.delete(id);
  }
}
