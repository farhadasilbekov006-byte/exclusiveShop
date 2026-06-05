import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Cart, CartDocument } from "./Schema/CartSchema";


@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async getCart(userId: string): Promise<CartDocument | null> {
    return this.cartModel.findOne({ userId }).populate('items.productId').exec();
  }
  
  async addItem(userId: string, productId: string, quantity: number): Promise<CartDocument> {
  let cart = await this.cartModel.findOne({ userId });
  if (!cart) {
    cart = new this.cartModel({ userId, items: [] });
  }

  const item = cart.items.find(i => i.productId.toString() === productId);
  if (item) {
    item.quantity += quantity;
  } else {
    cart.items.push({ productId: new Types.ObjectId(productId), quantity });
  }

  return cart.save();
}


  async updateQuantity(userId: string, productId: string, quantity: number): Promise<CartDocument | null> {
    const cart = await this.cartModel.findOne({ userId });
    if (!cart) return null;

    const item = cart.items.find(i => i.productId.toString() === productId);
    if (item) {
      item.quantity = quantity;
    }
    return cart.save();
  }

  async removeItem(userId: string, productId: string): Promise<CartDocument | null> {
    const cart = await this.cartModel.findOne({ userId });
    if (!cart) return null;

    cart.items = cart.items.filter(i => i.productId.toString() !== productId);
    return cart.save();
  }

  async clearCart(userId: string) {
  await this.cartModel.updateOne(
    { userId},
    { $set: { items: [] } } 
  );
}
}
