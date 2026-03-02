import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Logger } from '@nestjs/common';
const logger = new Logger('UserInformation');
  
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}

  matchRoles(roles: string[], userRole: string){
    return roles.some((role) => role === userRole);
  }
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });

      const role = this.reflector.get<string[]>('role', context.getHandler());
      logger.log(`Role controller: ${role}, role user: ${payload.role}, user email: ${payload.email} `);
      return this.matchRoles(role, payload.role);
    } catch (error) {
      throw new UnauthorizedException('Invalid token file auth');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
