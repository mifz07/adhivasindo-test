import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { sha256 } from 'js-sha256'

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    
    const key = 'adhivasindo'
    if (!apiKey || sha256(apiKey) !== sha256(key)) {
        const result = sha256(apiKey)
        console.error(`Invalid API Key: ${result}`);
      throw new UnauthorizedException('Invalid API Key');
    }

    return true;
  }
}