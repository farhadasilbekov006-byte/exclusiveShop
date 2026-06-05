import { IsString } from "class-validator";


export class createMessage {
    @IsString()
    name: string

    @IsString()
    email: string

    @IsString()
    phone: string

    @IsString()
    message: string
}