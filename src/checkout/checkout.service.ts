import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartService } from '../cart/cart.service';
import { Order, OrderDocument } from './schema/OrderDocument';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderResponse } from './dto/orderResponse';



@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private cartService: CartService,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<OrderDocument> {
    const cart = await this.cartService.getCart(dto.userId);

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Корзина пуста');
    }

    const items = (cart.items as any[]).map(i => ({
      productId: i.productId._id,
      quantity: i.quantity,
      price: i.productId.price,
    }));

    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = new this.orderModel({
      userId: dto.userId,
      items,
      totalPrice,
      name: dto.name,
      address: dto.address,
      phone: dto.phone,
      status: 'pending',
    });

    const savedOrder = await order.save();
    await this.cartService.clearCart(dto.userId);
    return savedOrder;
  }

  async confirmPayment(orderId: string): Promise<OrderDocument | null> {
    if (!orderId) throw new BadRequestException('Заказ не найден');
    return this.orderModel.findByIdAndUpdate(
      orderId,
      { status: 'paid' },
      { returnDocument: 'after' }
    ).populate('items.productId');
  }

  async getOrder(orderId: string): Promise<OrderResponse | null> {
    if (!orderId) throw new BadRequestException('Заказ не найден');
    const order = await this.orderModel.findById(orderId).populate('items.productId')
    if (!order) throw new BadRequestException('Заказ не найден');
     
    return {
      ...order.toObject(),
      _id: order._id.toString(),
      createdAt: new Date (order.createdAt).toLocaleDateString('ru-RU', {
        timeZone: 'Asia/Bishkek'
      })
    }
    
  }

  async getOrders() {
    const orders = await this.orderModel.find().populate('items.productId')
  
    return orders.map((order) => ({
      ...order.toObject(),
      createdAt: new Date(order.createdAt).toLocaleDateString('ru-RU', {
        timeZone: 'Asia/Bishkek',
      })
    }));
  }
}