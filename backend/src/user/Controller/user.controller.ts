import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from '../Service/user.service';
import { JwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
  constructor(private userservice: UserService) {}

  //protected route
  @UseGuards(JwtGuard)
  @Get('userprofile')
  getUserProfile(@Request() req) {
    return this.userservice.getUserProfile(req.user.userId);
  }

  
}
