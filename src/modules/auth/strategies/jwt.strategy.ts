import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayload } from 'src/modules/auth/interfaces/user-payload.interface';
import { ENV } from 'src/modules/common/env.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ENV.JWT_SECRET,
    });
  }

  validate(payload: UserPayload): UserPayload {
    // validate the parameters of the payload

    if (!payload.sub || !payload.nome || !payload.email) {
      throw new UnauthorizedException();
    }

    return {
      sub: payload.sub,
      nome: payload.nome,
      email: payload.email,
    };
  }
}
