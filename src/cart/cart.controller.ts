import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CartService } from "./cart.service";
import { AddToCartDto } from "./Dto/create-dto-cart";
import { UpdateQuantityDto } from "./Dto/update-quantity.dto";
import { RemoveItemDto } from "./Dto/remove-item.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
   constructor(private readonly cartService: CartService) {}
   
   @Get()
   async getCart(@Req() req) {
      return this.cartService.getCart(req.user.userId)
   }
   
   @Post('add')
   async addItem( @Req() req, @Body() dto: AddToCartDto) {
      return this.cartService.addItem(req.user.userId, dto.productId, dto.quantity)
   }

   @Put('update')
   async updateQuantity(@Req() req , @Body() dto: UpdateQuantityDto) {
      return this.cartService.updateQuantity(req.user.userId, dto.productId, dto.quantity)
   }

   @Delete('remove')
   async removeItem(@Req() req ,@Body() dto: RemoveItemDto) {
      return this.cartService.removeItem(req.user.userId, dto.productId)
   }

  @Post('clear')
  async clear(@Req() req) {
    const userId = req.user._id;
    await this.cartService.clearCart(userId);
    return { message: 'Корзина очищена' };
  }
}