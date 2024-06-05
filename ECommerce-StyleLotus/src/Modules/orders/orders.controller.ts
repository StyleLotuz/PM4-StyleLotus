import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Product } from 'src/entities/product.entity';
import { CreateOrderDto } from 'src/Dtos/CreateOrder.dto';
import { AuthGuard } from 'src/Guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard)
  @Post()
  addOrder(@Body() orderInfo: CreateOrderDto) {
    return this.ordersService.addOrder(orderInfo);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrder(id);
  }
}
