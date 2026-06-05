import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductQueryBuilder } from './Filter/ProductQueryBuilder';
import { ProductQueryDto } from './product.dto.ts/Product.dto';
import { Product, ProductSchema } from './schema/Product.schema';
 
@Module({
    imports: [ 
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema}
        ])
    ],
    controllers: [ProductController],
    providers: [ProductService, ProductQueryBuilder , ProductQueryDto],})
export class ProductModule {}