import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AdminauthService } from '../service/adminauth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private adminAuthService: AdminauthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    if (!requiredRoles && !requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (user.role === 'admin') {
      return true; // Admin has all permissions
    }

    if (requiredRoles && !requiredRoles.includes(user.role)) {
      return false;
    }

    if (requiredPermissions) {
      for (const permission of requiredPermissions) {
        if (
          !(await this.adminAuthService.hasPermission(user.email, permission))
        ) {
          return false;
        }
      }
    }

    return true;
  }
}
