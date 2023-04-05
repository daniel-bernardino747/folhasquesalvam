import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

import { IS_PUBLIC_KEY } from './auth.decorator';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const session = this.extractSessionFromHeader(request);
    if (!session) {
      throw new UnauthorizedException();
    }
    try {
      // const payload = await this.authService.verifySessionAndRole(session);
      // if (payload.session.status !== 'active') throw false;

      request['user'] = 'chegou'; // payload.user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractSessionFromHeader(request: Request): string | undefined {
    const [type, session] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? session : undefined;
  }
}
