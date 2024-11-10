import { AuthGuard } from '@nestjs/passport';
import { AdminauthService } from '../service/adminauth.service';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { RolesGuard } from '../guard/role.guard';
import { JwtGuard } from 'src/auth/guard';
import { Roles } from '../lib/roles.decorator';
import { Permissions } from '../lib/permission.decorator';

@Controller('adminauth')
export class AdminauthController {
  constructor(private adminauthservice: AdminauthService) {}

  @Post('register')
  async register(
    @Body() userData: { username: string; password: string; role: string },
  ) {
    return this.adminauthservice.createUser(
      userData.username,
      userData.password,
      userData.role,
    );
  }

  @Post('login')
  async login(@Body() userData: { username: string; password: string }) {
    return this.adminauthservice.signin(userData.username, userData.password);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Post('add-permission')
  @Permissions('manage_permissions')
  async addPermission(
    @Body() data: { email: string; permission: string },
    @Request() req,
  ) {
    if (req.user.role !== 'admin' && req.user.email !== data.email) {
      throw new ForbiddenException('You can only modify your own permissions');
    }
    return this.adminauthservice.addPermissionToUser(
      data.email,
      data.permission,
    );
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Post('remove-permission')
  @Permissions('manage_permissions')
  async removePermission(
    @Body() data: { email: string; permission: string },
    @Request() req,
  ) {
    if (req.user.role !== 'admin' && req.user.email !== data.email) {
      throw new ForbiddenException('You can only modify your own permissions');
    }
    return this.adminauthservice.removePermissionFromUser(
      data.email,
      data.permission,
    );
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Get('profile')
  @Roles('admin', 'manager', 'customer_support')
  getProfile(@Request() req) {
    return req.user;
  }
}
