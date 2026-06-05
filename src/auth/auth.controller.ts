import { Controller, Post, UseGuards , Request, Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuards } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

   @Post('login')
   @UseGuards(LocalAuthGuards)
   login(@Request() req) {
    return this.authService.login(req.user);
  }
  

}
