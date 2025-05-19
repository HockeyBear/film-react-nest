import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { createOrderDto } from '../dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() order: createOrderDto) {
    return this.orderService.orderPlace(order);
  }
}
