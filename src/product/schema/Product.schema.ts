import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'

@Schema()
export class Product {
  @Prop({ required: true})
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  image: string;
  
  @Prop()
  description: string;
  
  @Prop()
  category: string;
  

  @Prop()
  brand: string;
  
  } 


export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
