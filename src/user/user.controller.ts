import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto.ts/create-user.dto';
import { updateUserDto } from './user.dto.ts/update_user.dto';

@Controller('auth')
export class UserController {
    constructor(
        private readonly userService: UserService) {}
    
    @Get() 
    getAllUsers() {
        return this.userService.getAllUsers()
    }

    @Patch(':id')
    updateRole(@Param('id') id: string, @Body() dto:updateUserDto) {
        return this.userService.updateRole(id , dto.role)
    }

    
    @Post('register')
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto)
    }

    
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id)
    }

    @Get()
    findOne(@Query('email') email: string) {
        return this.userService.findOne(email);
    }

}