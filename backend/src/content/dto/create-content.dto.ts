import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateContentDto {
  @ApiProperty({
    example: 'This is title',
    description: 'Judul kontent',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    description: 'Isi content',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    example: 'uploads/123456789.jpg',
    description: 'Path gambar konten',
    required: false
  })
  @IsString()
  @IsOptional()
  image?: string;
}
