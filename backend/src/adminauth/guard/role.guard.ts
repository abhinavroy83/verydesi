import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AdminauthService } from '../service/adminauth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private adminauthService: AdminauthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!requiredPermissions) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    if (user.role === 'admin') {
      return true; // Admin has all permissions
    }

    for (const permission of requiredPermissions) {
      if (!(await this.adminauthService.hasPermission(user.username, permission))) {
        return false;
      }
    }
    return true;
  }
}
