import { Injectable } from '@nestjs/common';
import { ProductQueryDto } from '../product.dto.ts/Product.dto';

type PriceRange = {
        $gte?: number;
        $lte?: number;
    }
type ProductFilter = {
    name?: {
        $regex?: string;
        $options?: string;
    }
    category?: string;
    brand?: string;
    price?: PriceRange;
};


@Injectable()
export class ProductQueryBuilder {
  build(query: ProductQueryDto) {
    const filter: ProductFilter = {};

    if (query.search) {
      filter.name = {
        $regex: query.search,
        $options: 'i',
      };
    }
    
    if(query.category) {
      filter.category = query.category
    }
  
    if (query.brand) {
      filter.brand = query.brand;
    }

    if (query.min || query.max) {
      const price: PriceRange = {};

      if (query.min) {
        price.$gte = query.min;
      }

      if (query.max) {
        price.$lte = query.max;
      }

      filter.price = price;
    }

    return filter;
  }
}