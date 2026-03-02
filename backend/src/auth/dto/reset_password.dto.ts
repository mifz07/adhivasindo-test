import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class ResetPasswordDto {
  @ApiProperty({
        example: 'taofik.miftah@gmail.com',
        description: 'email yang sudah terdaftar'
    })
  @IsEmail()
  @IsNotEmpty()
  email: string
  
  @ApiProperty({
      example: 'ct123456',
      description: 'Password baru'
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string

  @ApiProperty({
      example: 'ct123456',
      description: 're type password'
  })
  @IsNotEmpty()
  @IsNotEmpty()
  re_password: string
}