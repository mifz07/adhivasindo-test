import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { AccessTokenGuard } from 'src/common/guard/accessToken.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { errorResponse } from 'src/common/response/response';
import { ListContentDto } from './dto/list-content.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @ApiOperation({
    summary: 'Create Content',
    description: 'Endpoint untuk membuat konten baru dan hanya bisa diakses oleh admin'
  })
  @ApiResponse({ status: 201, description: 'Content successfully created' })
  @ApiResponse({ status: 403, description: 'Forbidden. You do not have permission to access this resource.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid input data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 503, description: 'Server is under maintenance' })
  @UseGuards(AccessTokenGuard)
  @Roles(Role.ADMIN)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      limits: {
        fileSize: 2 * 1024 * 1024, 
      },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueName + extname(file.originalname))
        }
      })
    })
  )
  async create(@Body() createContentDto: CreateContentDto, @Req() req: Request, @UploadedFile() file?: Express.Multer.File) {
    const user_id = req.user?.['userId']
    if(!user_id)
      return errorResponse('Unauthorized', 401)
    
    try{
      createContentDto.image = file?.path ?? ''
      return await this.contentService.create(createContentDto, user_id);
    }catch(error){
      return errorResponse('Server is under maintenance', 503, error.message ?? error)
    }
  }

  @ApiOperation({
    summary: 'Get All Content',
    description: 'Endpoint untuk mendaptkan semua kontent yang ada, bisa diakses oleh semua role'
  })
  @ApiResponse({ status: 200, description: 'Successfully retrived all content' })
  @ApiResponse({ status: 503, description: 'Server is under maintenance' })
  @UseGuards(AccessTokenGuard)
  @Post('list-content')
  async findAll(@Body() dto: ListContentDto) {
    try{
      return await this.contentService.findAll(dto);
    }catch(error){
      return errorResponse('Server is under maintenance', 503, error.message ?? error)
    }
    
  }

  @ApiOperation({
    summary: 'Get Content Detail',
    description: 'Endpoint untuk mendapatkan detail konten berdasarkan id, bisa diakses oleh semua role'
  })
  @ApiResponse({ status: 200, description: 'Successfully retrived content' })
  @ApiResponse({ status: 404, description: 'Content not found' })
  @ApiResponse({ status: 503, description: 'Server is under maintenance' })
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    try{
      return this.contentService.findOne(+id);
    }catch(error){
      return errorResponse('Server is under maintenance', 503, error.message ?? error)
    }
  }

  @ApiOperation({
    summary: 'Update Content',
    description: 'Endpoint untuk update kontent berdasarkan id dan hanya dapat diakses oleh admin'
  })
  @ApiResponse({ status: 200, description: 'Content successfully updated' })
  @ApiResponse({ status: 403, description: 'Forbidden. You do not have permission to access this resource.' })
  @ApiResponse({ status: 404, description: 'Content not found' })
  @ApiResponse({ status: 503, description: 'Server is under maintenance' })
  @UseGuards(AccessTokenGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      limits: {
        fileSize: 2 * 1024 * 1024, 
      },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueName + extname(file.originalname))
        }
      })
    })
  )
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto, @UploadedFile() file?: Express.Multer.File) {
    try{
      updateContentDto.image = file?.path ?? updateContentDto.image
      return this.contentService.update(+id, updateContentDto);
    }catch(error){
      return errorResponse('Server is under maintenance', 503, error.message ?? error)
    }
  }

  @ApiOperation({
    summary: 'Delete Content',
    description: 'Endpoint untuk soft delete content berdasarkan id dan hanya dapat diakses oleh admin'
  })
  @ApiResponse({ status: 200, description: 'Content successfully deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden. You do not have permission to access this resource.' })
  @ApiResponse({ status: 404, description: 'Content not found' })
  @ApiResponse({ status: 503, description: 'Server is under maintenance' })
  @UseGuards(AccessTokenGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try{
      return this.contentService.remove(+id);
    }catch(error){
      return errorResponse('Server is under maintenance', 503, error.message ?? error)
    }
  }
}
