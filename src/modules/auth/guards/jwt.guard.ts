import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { lastValueFrom } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/modules/auth/decorators/is-public.decorator';
import { UserPayload } from '../interfaces/user-payload.interface';
import { RequestWithUser } from '../interfaces/request-with-user.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (isPublic) return true;

      const canActivate = await super.canActivate(context);

      if (typeof canActivate === 'boolean') return canActivate;

      return await lastValueFrom(canActivate);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  handleRequest<TUser = UserPayload>(
    err: unknown,
    user: UserPayload,
    info: unknown,
    context: ExecutionContext,
  ): TUser {
    if (err || !user) throw new UnauthorizedException();

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    request.user = user;

    return user as TUser;
  }
}
