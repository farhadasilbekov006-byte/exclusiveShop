import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './Schema/CartSchema';
import { Product, ProductSchema } from 'src/product/schema/Product.schema';

@Module({
  imports : [MongooseModule.forFeature([
    {name: Cart.name, schema: CartSchema},
    {name: Product.name, schema: ProductSchema}
  ])],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule {}
