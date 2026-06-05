import { Types } from "mongoose";

export interface OrderResponse {
  _id: string;
  userId: string;
  items: {
    productId:Types.ObjectId | {
      _id: string;
      name: string;
      price: number;
    };
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  name: string;
  address: string;
  phone: string;
  status: string;
  createdAt: string; 
}

