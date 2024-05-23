import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

      return users;
    } catch (err) {
      console.error('Error fetching users', err);
      throw new Error('Could not fetch users');
    }
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) return user;
    else return null;
  }

  async createNewUser(userData: User) {
    try {
      return this.usersRepository.save(userData);
    } catch (err) {
      console.error('Error creating user ', err);
      throw new Error('Could not create user');
    }
  }

  async modifyUser(id: string, userData: User) {
    try {
      return await this.usersRepository.update(id, userData);
    } catch (err) {
      console.error('Error updating user', err);
      throw new Error('Could not update user');
    }
  }

  async deleteUser(id: string) {
    return await this.usersRepository.delete(id);
  }
}
