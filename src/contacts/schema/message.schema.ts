import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Message {
  @Prop()
  name: string

  @Prop()
  email: string

  @Prop()
  phone: string

  @Prop()
  message: string
} 

export const MessageSchema = SchemaFactory.createForClass(Message)