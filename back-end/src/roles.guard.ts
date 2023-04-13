import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    console.log('vou passar pelo rolesGuard');
    const request = context.switchToHttp().getRequest();

    if (!request?.user) {
      return false;
    }
    console.log('estoi aqui =>', request.user);

    // get roles of user by id
    const roles = '';

    return requiredRoles.some((role) => roles?.includes(role));
  }
}
