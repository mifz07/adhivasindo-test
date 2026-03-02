import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guard/accessToken.guard';
import { errorResponse } from 'src/common/response/response';
import { Role } from 'src/common/enum/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import type { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Detail user informatin'})
  @ApiResponse({ status: 200, description: 'Berhasil mendapatkan data' })
  @ApiResponse({ status: 404, description: 'Data tidak ditemukan' })
  @ApiResponse({ status: 503, description: 'server dalam perbaikan' })
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    try{
      return await this.userService.findOne(+id);
    }catch(error){
      return errorResponse('Server dalam perbaikan', 503, error.message ?? error)
    }
  }

  @UseGuards(AccessTokenGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }


}
