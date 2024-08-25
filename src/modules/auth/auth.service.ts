import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserIdentity } from '../../common/types/user-identity.type';
import { convertBigIntToNumber } from '../../common/utils';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async handleLogin(
    user: { id: bigint; nome: string; email: string; senha: string },
    password: string,
  ): Promise<UserIdentity> {
    const isAuthenticated = await bcrypt.compare(password, user.senha);

    if (!isAuthenticated)
      throw new UnauthorizedException(
        'O e-mail ou a senha informados está incorreto.',
      );

    return await this.genereateToken(convertBigIntToNumber(user));
  }

  async genereateToken(user: {
    id: number;
    nome: string;
    email: string;
  }): Promise<UserIdentity> {
    const payload = {
      sub: user.id,
      nome: user.nome,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    const tokenDecoded = this.jwtService.decode<{ exp: number }>(token);

    const expiration = new Date(tokenDecoded.exp * 1000);

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      token,
      expiration,
    };
  }
}
