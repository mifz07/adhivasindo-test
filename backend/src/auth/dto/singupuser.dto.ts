import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, isBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, Matches, MinLength } from "class-validator";

import { Gender } from "src/common/enum/gender.enum";
import { Role } from "src/common/enum/role.enum";

export enum UserType {
    USER = 'user',
    ADMIN = 'admin'
}

export class SignUpUser{
    @ApiProperty({
        example: 1,
        description: 'Di isi ketika mau update data', 
        required: false
    })
    @IsNumber()
    @IsOptional()
    id: number;

    @ApiProperty({
        example: 'John Doe',
        description: `Nama user`,
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: 'Full name min 2 character' })
    full_name: string;

    @ApiProperty({
        example: 'male',
        description: `Jenis kelamin: ${Gender.MALE}, ${Gender.FEMALE}`,
        required: true
    })
    @IsEnum(Gender)
    @IsOptional()
    gender: Gender;


    @ApiProperty({
        example: 'iniemail@mail.com',
        description: 'email aktif',
        required: true
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty({
        example: '08123456789',
        description: 'Nomor aktif',
        required: true
    })
    @IsPhoneNumber('ID')
    @IsNotEmpty()
    phone_number: string;

    @ApiProperty({
        example: '1Du@Tiluuu',
        description: '8 karakter, minimal ada 1 huruf, 1 angka, 1 spesial karakter',
        required: true
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, { message: 'Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character'})
    @IsNotEmpty()
    password: string;


    @ApiProperty({
        example: 'https://imagekit.io/1231234.png',
        description: 'url imagekit',
        required: false
    })
    @IsString()
    @IsOptional()
    image: string

    @ApiProperty({
        example: UserType.ADMIN,
        description: `Tipe user: ${UserType.ADMIN} atau ${UserType.USER}`,
        required: true
    })
    @IsEnum(UserType)
    @IsNotEmpty()
    role: UserType;

}