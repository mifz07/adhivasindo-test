import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import * as bcrypt from 'bcrypt';
import { Login } from './dto/login.dto';
import { SignUpUser, UserType } from './dto/singupuser.dto';
import { VerificationDto } from './dto/verification.dto';
import { errorResponse, successResponse } from 'src/common/response/response';
import { UserService } from 'src/user/user.service';
import { ResetPasswordDto } from './dto/reset_password.dto';
import { Role } from 'src/common/enum/role.enum';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  saltOrRounds: number = 10;

  hashData(data: string) {
    return argon2.hash(data);
  }

  async register(signupuser: SignUpUser) {
    // check user type
    let user: any;

    user = await this.userService.findOneByEmail(signupuser.email)
    
    if (user) {
      return errorResponse(`Email sudah terdaftar`);
    } else {
      const hash = await bcrypt.hash(
        signupuser.password,
        this.saltOrRounds,
      );
      const createUserDto: CreateUserDto = {
        ...signupuser,
        password: hash,
      };

      const result = await this.userRepository.save(createUserDto);
      return successResponse('Berhasil membuat akun');
    }
  }

  getEnumKeyByEnumValue(enumObj: any, enumValue: any): string {
    let keys = Object.keys(enumObj).filter(k => enumObj[k] === enumValue);
    return keys.length > 0 ? keys[0] : '';
  }

  async login(data: Login) : Promise<LoginResponse> {
    // check user type and email
    const user = await this.userService.findOneByEmail(data.email);
    if (!user) {
      return {
        status: false,
        message: `Anda belum terdaftar`
      };
    }
    
    const type = this.getEnumKeyByEnumValue(UserType, user.role)
    // check password
    const isMatch = await bcrypt.compare(data?.password, user.password);
    if (!isMatch) return { status: false, message: 'Password anda salah'};

    const tokens = await this.getTokens(Number(user.id), user.email, Role[type]);
    const updateToken = await this.updateRefreshToken(Number(user.id), tokens.refreshToken, type);
      
    if(tokens.accessToken && updateToken.affected === 1){
      return {
        status: true,
        tokens: tokens,
        user_id: user.id.toString(),
        name: user.full_name,
        email: user.email,
        user_type: user.role
      } satisfies LoginSuccessResponse; ;
    }
    return { status: false } as LoginErrorResponse;  
  }

  async logout(userId: number) {
    const refreshToken = '';
    return await this.userService.updateRefreshToken(userId, refreshToken);
  }

  async updateRefreshToken(userId: number, refreshToken: string, type: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    return await this.userService.updateRefreshToken(userId, hashedRefreshToken);
  }

  async getTokens(userId: number, email: string, role: string) {
    const id = userId.toString();
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id,
          email,
          role,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        {
          id,
          email,
          role,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      id,
      email,
      accessToken,
      refreshToken,
      role,
    };
  }

  async refreshTokens(userId: number, refreshToken: string, userType: string) {
    const user = await this.userService.findById(userId);
    if (!user) throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken);
    if (!refreshTokenMatches) throw new ForbiddenException('Refresh token is not valid');

    const tokens = await this.getTokens(
      Number(user.id),
      user.full_name,
      userType,
    );
    
    await this.userService.updateRefreshToken(Number(user.id), tokens.refreshToken);
    
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      email: user.email,
      userId: user.id.toString(),
      role: userType,
    };
  }

}
