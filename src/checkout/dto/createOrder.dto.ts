import { IsString, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  userId: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;
}