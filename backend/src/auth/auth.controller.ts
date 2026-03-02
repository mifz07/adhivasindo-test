import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from 'src/common/guard/accessToken.guard';
import type { Request, Response } from 'express';
import { Login } from './dto/login.dto';
import { SignUpUser } from './dto/singupuser.dto';
import { JwtService } from '@nestjs/jwt';
import { errorResponse, successResponse } from 'src/common/response/response';
import { ResetPasswordDto } from './dto/reset_password.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { RefreshTokenGuard } from 'src/common/guard/refreshToken.guard';
import { VerificationDto } from './dto/verification.dto';

@ApiTags('Authentication')
@ApiBearerAuth('access-token')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('me')
  @UseGuards(AccessTokenGuard)
  getMe(@Req() req: Request) {
    return {
      userId: req.user?.['userId'],
      role: req.user?.['role']
    }
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Check authentication'})
  @ApiResponse({ status: 200, description: 'Return data user and token' })
  @ApiResponse({ status: 403, description: 'Unauthorized' })
  @UseGuards(AccessTokenGuard)
  @Get('check-auth')
  getProfile(@Req() req: Request) {
    if(req.user?.['userId'])
      return successResponse('Authenticated', req.user)
    else
      throw UnauthorizedException
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Logout user'})
  @ApiResponse({ status: 200, description: 'Logged out' })
  @ApiResponse({ status: 400, description: 'Cannot logout' })
  @ApiResponse({ status: 503, description: 'Server dalam perbaikan' })
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try{
      const result = await this.authService.logout(req.user?.['userId']);
      if (result.affected == 1) {
        if (result) {
          // Set access token as an HTTP-only cookie
          res.cookie('accessToken', '', {
            httpOnly: true,
            maxAge: 0, // 60 minutes
          });

          // Set refresh token as an HTTP-only cookie
          res.cookie('refreshToken', '', {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            // sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });

          res.cookie('userId', '', {
            httpOnly: true,
            maxAge: 0,
          });

          res.cookie('username', '', {
            maxAge: 0,
          });

          return successResponse('Logout berhasil');
        }
      } else {
        return errorResponse('Tidak dapat logout')
      }
    }catch(error){
      return errorResponse('Server dalam perbaikan', 503, error.message ?? error)
    }
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @UseGuards(RefreshTokenGuard)
  @Get('refresh-token')
  async refreshTokens(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const userId = req.user?.['UserId'];
    const refreshToken = req.user?.['refreshToken'];
    const userType = req.user?.['role']
    try{
      const result = await this.authService.refreshTokens(
        userId,
        refreshToken,
        userType
      );
      if (result) {
        // Set access token as an HTTP-only cookie
        res.cookie('accessToken', result.accessToken, {
          httpOnly: true,
          sameSite: 'lax',
          secure: false,
          maxAge: 24 * 60 * 60 * 1000,
        })

        // Set refresh tokens as an HTTP-only cookie
        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.cookie('user_id', result.userId, {
          httpOnly: true,
          sameSite: 'lax',
          secure: false,
          maxAge: 240 * 60 * 1000,
        });

        res.cookie('email', result.email, {
          httpOnly: true,
          sameSite: 'lax',
          secure: false,
          maxAge: 240 * 60 * 1000,
        })

        res.cookie('user_type', result.role, {
          httpOnly: true,
          sameSite: 'lax',
          secure: false,
          maxAge: 240 * 60 * 1000,
        });

        return successResponse('Berhasil mendapat token baru', result)
          
        } else {
          throw new UnauthorizedException('Invalid credentials');
        }
    }catch(error){
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Post('register')
  async register(@Body() signupuser: SignUpUser) {
    try {
      const result = await this.authService.register(signupuser);
      return result
    } catch (error) {
      return errorResponse('Server dalam perbaikan', 503, error.message ?? error)
    }
  }
  
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('login')
  async login(@Body() data: Login, @Res({ passthrough: true }) res: Response) {
    try {
      const result = await this.authService.login(data);
      if (result.status) {
        // Set access token as an HTTP-only cookie
        res.cookie('accessToken', result.tokens.accessToken, {
          httpOnly: true,
          sameSite: 'lax',
          secure: false,
          maxAge: 24 * 60 * 60 * 1000,
        })

        // Set refresh tokens as an HTTP-only cookie
        res.cookie('refreshToken', result.tokens.refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.cookie('user_id', result.user_id, {
          httpOnly: true,
          sameSite: 'lax',
          secure: false,
          maxAge: 240 * 60 * 1000,
        });

        res.cookie('email', result.email, {
          httpOnly: true,
          sameSite: 'lax',
          secure: false,
          maxAge: 240 * 60 * 1000,
        })

        res.cookie('user_type', result.user_type, {
          httpOnly: true,
          sameSite: 'lax',
          secure: false,
          maxAge: 240 * 60 * 1000,
        });

        return successResponse('Login berhasil', {
          access_tooken: result.tokens.accessToken,
          refresh_token: result.tokens.refreshToken,
          user_id: result.user_id,
          email: result.tokens.email,
          name: result.name,
          role: result.user_type
        })
      } else {
        return errorResponse(result.message)
      }
    } catch (error) {
      return errorResponse('Server dalam perbaikan', 503, error.message ?? error)
    }
  }
  

}
