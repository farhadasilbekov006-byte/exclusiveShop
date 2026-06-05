import { IsString } from "class-validator";

export class updateUserDto {
    @IsString()
    role: 'user' | 'admin';
}