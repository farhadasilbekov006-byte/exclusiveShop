import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateOrUpdateDto } from "./product.dto.ts/CreateOrUpdate.dto";
import { ProductQueryDto } from "./product.dto.ts/Product.dto";
import { AdminGuard } from "src/admin/admin.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
       
    @Get()
    async findAll(@Query() query: ProductQueryDto ) {
    return this.productService.findAll(query)
    }
    
    @UseGuards(JwtAuthGuard ,AdminGuard)
    @Post()
    async create(@Body() dto: CreateOrUpdateDto) {
        return this.productService.create(dto)
    }
    
    @UseGuards( JwtAuthGuard,AdminGuard)
    @Patch(':id') 
    async update(@Param('id') id: string, @Body() dto: CreateOrUpdateDto) {
        return this.productService.update(id,dto)
    }
    
    @UseGuards( JwtAuthGuard ,AdminGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.productService.remove(id);
    }
    
    @Get(':id') 
    async findOne(@Param('id') id: string) {
        return this.productService.findOne(id);
    }
}