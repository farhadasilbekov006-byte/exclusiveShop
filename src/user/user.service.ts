import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './user.dto.ts/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly jwtService: JwtService
    ) {}

    async getAllUsers() {
        return this.userModel.find()
    }

    async updateRole(id: string, role: 'user' | 'admin') {
       return this.userModel.findByIdAndUpdate(id, { role }, { new: true });
    }

    async create(dto: CreateUserDto) {
        const existUser = await this.userModel.findOne({
           email: dto.email
        })
        if (existUser) throw new BadRequestException('Пользователь уже существует')
        
        const hash = await bcrypt.hash(dto.password, 10);

        const user = new this.userModel({
            ...dto,
            password: hash
        });
   
        const savedUser = await user.save()


        const payload = { id: savedUser._id.toString(), email: savedUser.email, role: savedUser }
        const token = this.jwtService.sign(payload)

        return {
            user: savedUser,
            role: savedUser,
            token,
        }
    }

    
    async remove(id: string) {
        await this.userModel.findByIdAndDelete(id)
        return {message: 'Double KILL!'}
    }
    async findOne(email: string) {
        return this.userModel.findOne({email})
    }
}
