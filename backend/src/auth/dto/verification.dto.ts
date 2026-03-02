import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class VerificationDto{
    @ApiProperty({
        example: '1234',
        description: 'Code otp yang dikirim ke email'
    })
    @IsNotEmpty()
    @IsString()
    otp_number: string;

    @ApiProperty({
        example: 'mail@mail.com',
        description: 'email akun'
    })
    @IsNotEmpty()
    @IsString()
    email: string;

}