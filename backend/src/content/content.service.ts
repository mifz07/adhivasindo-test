import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Brackets, Repository } from 'typeorm';
import { errorResponse, successResponse } from 'src/common/response/response';
import { ListContentDto } from './dto/list-content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content) private readonly contentRepository: Repository<Content>
  ){}
  async create(createContentDto: CreateContentDto, user_id: number) {
    const result = await this.contentRepository.save({
      ...createContentDto,
      user: { id: user_id }
    })
    if(result.id)
      return successResponse("Content successfully created")

    return errorResponse('Failed to create content', 500)
  }

  async findAll(dto: ListContentDto) {
    const page = dto.page ?? 1
    const perPage = Number(dto.perpage ?? 10)
    const skip = (page - 1) * perPage

    const query = this.contentRepository.createQueryBuilder('content')
    .leftJoinAndSelect('content.user', 'user')
    .where('content.status = :status', { status: true })
    if(dto.keyword){
      query.andWhere(
        new Brackets(qb => {
          qb.where('content.title ILIKE :keyword', { keyword: `%${dto.keyword}%` })
          .orWhere('content.body ILIKE :keyword', { keyword: `%${dto.keyword}%` })
        })
      )
    }

    query.skip(skip).take(perPage);

    const [result, total] = await query.getManyAndCount();
    return successResponse("Successfully retrieved all content", { data: result, total, page });
  }

  async findOne(id: number) {
    const content = await this.contentRepository.findOne({
      where: {
        id: id,
        status: true
      },
      relations: ['user']
    })

    if(!content)
      return errorResponse('Content not found', 404)

    return successResponse('Successfully retrieved content', content)
  }

  async update(id: number, updateContentDto: UpdateContentDto) {
    const content = await this.contentRepository.findOneBy({id: id})
    if(!content)
      return errorResponse('Content not found', 404)

    if(content.image && !updateContentDto.image)
      updateContentDto.image = content.image
    else
      updateContentDto.image = updateContentDto.image ?? ''
    
    const result = await this.contentRepository.update(id, updateContentDto)
    if(result.affected === 1)
      return successResponse('Content successfully updated')

    return errorResponse('Failed to update content', 500)
  }

  async remove(id: number) {
    const content = await this. contentRepository.findOneBy({id: id})
    if(!content)
      return errorResponse('Content not found', 404)

    const result = await this.contentRepository.update(id, {status: false})

    if(result.affected === 1)
      return successResponse('Content successfully deleted')

    return errorResponse('Failed to delete content', 500)
  }
}
