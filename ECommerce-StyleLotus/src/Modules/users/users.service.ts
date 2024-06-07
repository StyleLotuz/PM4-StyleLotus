import {
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from 'src/Dtos/CreateUser.dto';
import { User } from 'src/entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly usersRepository: UsersRepository
  ) { }

  async getAllUser(page: number, limit: number) {
    return this.usersRepository.getAllUser(page, limit)
  }

  async getUserById(id: string): Promise<Omit<User, 'password' | 'isAdmin'>> {
    return this.usersRepository.getUserById(id)
  }

  async modifyUser(id: string, userData: Partial<CreateUserDto>) {
    return this.usersRepository.modifyUser(id, userData)
  }

  async deleteUser(id: string) {
    return this.usersRepository.deleteUser(id)
  }
}
