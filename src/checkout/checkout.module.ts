import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/OrderDocument';
import { CartModule } from 'src/cart/cart.module';
import { OrderController } from './checkout.controller';
import { OrderService } from './checkout.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Order.name , schema: OrderSchema},
        ]),
        CartModule
    ],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [OrderService],
})
export class CheckoutModule {}
