import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Product } from "./schema/Product.schema";
import { ProductQueryBuilder } from "./Filter/ProductQueryBuilder";
import { InjectModel } from "@nestjs/mongoose";
import { ProductQueryDto } from "./product.dto.ts/Product.dto"; 
import { CreateOrUpdateDto } from "./product.dto.ts/CreateOrUpdate.dto";

@Injectable()
export class ProductService {
    constructor (
        @InjectModel(Product.name) private readonly productModel: Model<Product>,
        private readonly productQuerybuilder: ProductQueryBuilder,
    ) {}

    async findAll(query: ProductQueryDto) {
        const filter = this.productQuerybuilder.build(query)
        return this.productModel.find(filter).exec()
    } 

    async create(dto: CreateOrUpdateDto ) {
        return this.productModel.create(dto)
    }

    async update(id: string, dto: CreateOrUpdateDto) {
        return this.productModel.findByIdAndUpdate(id ,dto, {new: true}).exec()
    }

    async remove(id: string) {
        await this.productModel.findByIdAndDelete(id).exec();
        return {message: "headShot"}
    }

    async findOne(id: string) {
        return this.productModel.findById(id).exec()   
   }
}