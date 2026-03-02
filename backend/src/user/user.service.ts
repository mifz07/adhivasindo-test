import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { errorResponse, successResponse } from 'src/common/response/response';
import { Role } from 'src/common/enum/role.enum';
import { Login } from 'src/auth/dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) {
    
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    const user = await this.userRepository.createQueryBuilder('user')
                .where('user.id = :id', {id: id})
                .getOne()
 
    if(!user)
      return errorResponse('Data user tidak ditemukan', 404)

    return successResponse('Berhasil mendapatkan data user', user)
  }

  async findOneByEmail(email: string){
   return await this.userRepository.findOne({ 
      where: {email: email}
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findById(id: number){
    return await this.userRepository.findOne({ 
      where: {id: id},
      relations: ['student', 'teacher', 'admin']
    })
  }

  async updateRefreshToken(id: number, refreshToken: string){
    return await this.userRepository.update(id, {
      refreshToken: refreshToken
    })
  }

  async resetPassword(email: string, password: string){
    return await this.userRepository.update({email: email}, {
      password: password
    })
  }



  async getUserToken(user_id: number){
    const token = await this.userRepository.createQueryBuilder('user')
                  .select([
                    'user_device.fcm_token as token'
                  ])
                  .leftJoin('user.user_device', 'user_device')
                  .where('user.id = :id', {id: user_id})
                  .andWhere('user_device.fcm_token IS NOT NULL')
                  .getRawMany()

    return token
  }

}
