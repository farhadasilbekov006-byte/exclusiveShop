import { IsString , IsNumber } from "class-validator";

export class CreateOrUpdateDto {
@IsString()
image: string;

@IsString()
name: string;

@IsNumber()
price: number;

@IsString()
description: string;

@IsString()
category: string;

@IsString()
brand: string;

} 