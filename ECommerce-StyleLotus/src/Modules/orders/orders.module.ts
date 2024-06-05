import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/orders.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { User } from 'src/entities/user.entity';
import { OrderDetail } from 'src/entities/orderDetails.entity';
import { Product } from 'src/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, OrderDetail, Product])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersService, OrdersRepository],
})
export class OrdersModule {}
