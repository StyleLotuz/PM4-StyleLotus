import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/Dtos/CreateUser.dto';
import { Order } from 'src/entities/orders.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async getAllUser(page: number, limit: number) {
    const startIndex = (page - 1) * limit;

    try {
      const [users] = await this.usersRepository.findAndCount({
        skip: startIndex,
        take: limit,
      });

      const usersWithoutPasswords = users.map((user) => {
        const { isAdmin, password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      return usersWithoutPasswords;
    } catch (err) {
      console.error('Error fetching users', err);
      throw new Error('Could not fetch users');
    }
  }

  async getUserById(id: string): Promise<Omit<User, 'password' | 'isAdmin'>> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { orders: true },
    });

    if (!user) throw new NotFoundException('User not found');

    const { isAdmin: _, password: pass, ...userWithoutPassword } = user;

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

  async modifyUser(id: string, userData: Partial<CreateUserDto>) {
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
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: ['orders'],
      });

      if (!user) throw new NotFoundException('User not found');

      const ordersId = user.orders.map((order) => order.id);

      if (ordersId.length > 0) {
        await this.orderRepository.delete(ordersId);
      }

      return await this.usersRepository.delete(id);
    } catch (err) {
      throw new BadRequestException(
        `The delete operation was not completed, error ${err}`,
      );
    }
  }
}
