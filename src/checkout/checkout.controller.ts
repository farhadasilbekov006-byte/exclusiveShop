import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrderService } from './checkout.service';
import { CreateOrderDto } from './dto/createOrder.dto';

@Controller('checkout')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDto, @Request() req) {
    dto.userId = req.user.userId; 
    return this.orderService.createOrder(dto);
  }

  @Post('payment')
  async pay(@Body() body: { orderId: string }) {
    return this.orderService.confirmPayment(body.orderId);
  }

  @Get('order')
  async getOrd() {
    return this.orderService.getOrders()
  }
  
  @Get('order/:id')
  async getOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }
}