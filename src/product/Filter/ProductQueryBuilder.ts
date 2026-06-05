import { Injectable } from '@nestjs/common';
import { ProductQueryDto } from '../product.dto.ts/Product.dto';

type ProductFilter = {
    name?: {
        $regex?: string;
        $options?: string;
    }
    category?: string;
    brand?: string;
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

    return filter;
  }
}