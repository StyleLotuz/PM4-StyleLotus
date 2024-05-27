import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Product } from 'src/entities/product.entity';
import { CreateOrderDto } from 'src/Dtos/CreateOrder.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  addOrder(@Body() orderInfo: CreateOrderDto) {
    return this.ordersService.addOrder(orderInfo);
  }

  @Get()
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrder(id)
  }
}
