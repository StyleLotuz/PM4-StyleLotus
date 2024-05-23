import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  addOrder(@Body() body) {
    return this.ordersService.addOrder;
  }

  @Get()
  getOrder(@Param('id') id: string) {}
}
