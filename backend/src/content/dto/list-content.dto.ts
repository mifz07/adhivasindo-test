import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class ListContentDto {
  @ApiProperty({
    example: 'Test title',
    description: 'Keyword untuk mencari content berdasarkan title atau body',
    required: false
  })
  @IsString()
  @IsOptional()
  keyword?: string;

  @ApiProperty({
    example: 1,
    description: 'Current page',
    required: false
  })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({
    example: 10,
    description: 'Number dari jumlah content yang ingin ditampilkan per page',
    required: false
  })
  @IsNumber()
  @IsOptional()
  perpage?: number;
}