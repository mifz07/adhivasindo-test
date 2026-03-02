import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserType } from "./singupuser.dto";
import { ApiProperty } from "@nestjs/swagger";

export class Login{
    @ApiProperty({
        example: 'taofik.miftah@gmail.com',
        description: 'email yang sudah terdaftar'
    })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        example: 'ct123456',
        description: 'Akun admin ini mah'
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}