import { IsOptional, IsString, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class ProductQueryDto {

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    min?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    max?: number;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    brand?: string;
}