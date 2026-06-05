import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/types/UserEntity';

@Injectable()
export class AuthService {
    constructor( private readonly usersService: UserService, private readonly jwtService: JwtService) {}
    
    async validateUser(email: string, password: string) {
        const user = await this.usersService.findOne(email)
        console.log(user)
        if(!user) {
            throw new UnauthorizedException('Почта или пароль не верны');
        }

        const passwordIsMatched = await bcrypt.compare(
            password, 
            user.password,
        );

        if (!passwordIsMatched) {
        throw new UnauthorizedException ('Почта или пароль не верны')
        }
        return user;
    }

    async login(user: UserEntity) {
    const {_id, email, role} = user;

    const payload = {
        id: _id.toString(),
        email,
        role
    };

    return {
        token: this.jwtService.sign(payload)
    }
    };  
  }

