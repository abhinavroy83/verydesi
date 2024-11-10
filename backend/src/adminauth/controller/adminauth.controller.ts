import { AuthGuard } from '@nestjs/passport';
import { AdminauthService } from '../service/adminauth.service';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { RolesGuard } from '../guard/role.guard';
import { JwtGuard } from 'src/auth/guard';

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
  async addPermission(@Body() data: { username: string; permission: string }) {
    return this.adminauthservice.addPermissionToUser(
      data.username,
      data.permission,
    );
  }
}
