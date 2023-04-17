import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from './roles.decorator';
import { AuthService } from './auth/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private authService: AuthService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    if (!request?.user) {
      throw new UnauthorizedException();
    }

    // get roles of user by id
    const userId = request.user.id;
    const roles = await this.authService.getUserRoles(userId);

    const isAuthorized = requiredRoles.some((role) => roles?.includes(role));
    if (!isAuthorized) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
