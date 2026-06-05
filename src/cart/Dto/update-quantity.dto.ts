import { IsString, IsNumber, Min } from 'class-validator';

export class UpdateQuantityDto {
  @IsString()
  userId: string;

  @IsString()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}
