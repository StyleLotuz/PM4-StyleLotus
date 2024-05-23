import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/orders.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  addOrder(id: string) {
    try {
      const user = this.usersRepository.findOneBy({ id });
      const newDate = new Date();
      const formattedDate = newDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      const newOrder = this.usersRepository.save();
    } catch (err) {
      console.error('Error fetching order', err);
      throw new Error('Error fetching new Order');
    }
  }
}
