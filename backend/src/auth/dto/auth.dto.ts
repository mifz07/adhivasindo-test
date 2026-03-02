import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class AuthDto {
    @ApiProperty({
        example: 'John Doe',
        description: 'First Name'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: 'First name must have at least two characters.' })
    first_name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: 'Last name must have at least two characters.' })
    last_name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: 'Username must have at least two characters.' })
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    province: string;

    @IsString()
    @IsNotEmpty()
    postal_code: string;

    @IsString()
    @IsOptional()
    role: string;
}