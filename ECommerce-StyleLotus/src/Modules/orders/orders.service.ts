import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/orders.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from 'src/Dtos/CreateOrder.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrdersRepository,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  addOrder(orderInfo: CreateOrderDto) {
    return this.orderRepository.addOrder(orderInfo);
  }

  getOrder(id: string) {
    return this.orderRepository.getOrder(id);
  }
}
