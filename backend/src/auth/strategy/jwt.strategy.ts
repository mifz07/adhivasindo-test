import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly configService: ConfigService
    ){
        const key = configService.get<string>('JWT_ACCESS_SECRET') ?? 'secret';
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: key.toString()
        });
    }

    async validate(payload: { id: any; username: any; role: any; }){
        return {
            userId: payload.id,
            username: payload.username,
            role: payload.role
        };
    }
}