import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/Dtos/CreateOrder.dto';
import { OrderDetail } from 'src/entities/orderDetails.entity';
import { Order } from 'src/entities/orders.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { formatDate } from 'src/utils/date.utils';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async addOrder(orderInfo: CreateOrderDto) {
    try {
      const { userId, products } = orderInfo;
      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!user) {
        throw new NotFoundException('User not Found');
      }

      const newDate = new Date();

      let total: number = 0;
      const orderDetail: OrderDetail = new OrderDetail();
      const orderedProducts: Product[] = [];

      for (const productInfo of products) {
        const product = await this.productsRepository.findOne({
          where: { id: productInfo.id },
        });

        if (!product) {
          throw new NotFoundException('Product not Found');
        }

        if (product.stock <= 0) {
          throw new Error(`Product with ID ${productInfo.id} is not available`);
        }

        total += Number(product.price);
        product.stock -= 1;
        orderedProducts.push(product);

        await this.productsRepository.save(product);
      }

      orderDetail.price = parseFloat(total.toFixed(2));
      orderDetail.products = orderedProducts;

      const savedOrderDetails =
        await this.orderDetailRepository.save(orderDetail);

      const order = new Order();
      order.user = user;
      order.date = formatDate(newDate);
      order.orderDetail = savedOrderDetails;

      await this.orderRepository.save(order);

      return orderDetail;
    } catch (error) {
      console.log('Error creating a new order', error);
      throw new Error('Error creating a new Order');
    }
  }

  async getOrder(id: string) {
    try {
      const order = await this.orderDetailRepository.findOne({
        where: { id },
        relations: ['products'],
      });

      if (!order) {
        throw new NotFoundException('Order not found');
      }

      return order;
    } catch (err) {
      throw new BadRequestException('Order does not found');
    }
  }
}
