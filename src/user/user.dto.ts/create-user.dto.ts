import { IsEmail, MinLength, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsEmail({}, {message: 'Неверный формат почты'})
    @IsString({message: "Почта должен быть строкой"})
    @IsNotEmpty({message: "Почта не должен быть пустым"})
    email: string
     
    @MinLength(6, {message: 'пароль должен не менее 6 символов'})
    @IsString({message: 'Пароль должен быть строкой'})
    @IsNotEmpty({message:'Пароль не должен быть пустым'})
    password: string
}