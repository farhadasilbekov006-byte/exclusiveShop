import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type OrderDocument = Order & Document;
@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, type: String, ref: 'User' })
  userId: string;

  @Prop({
    type: [
      {
        productId: { type: Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    default: [],
  })
  items: { productId: Types.ObjectId; quantity: number; price: number }[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ default: 'pending' })
  status: string;

  @Prop({ type: Date })
  createdAt: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
