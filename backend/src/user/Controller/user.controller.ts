import {
  Body,
  Controller,
  Get,
  Patch,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../Service/user.service';
import { JwtGuard } from 'src/auth/guard';
import { UpdateUserdto } from 'src/auth/dto';

@Controller('user')
export class UserController {
  constructor(private userservice: UserService) {}

  //protected route
  @UseGuards(JwtGuard)
  @Get('userprofile')
  getUserProfile(@Request() req) {
    return this.userservice.getUserProfile(req.user.userId);
  }

  @UseGuards(JwtGuard)
  @Patch('updateUser')
  async updateUser(@Request() req, @Body() updateUserDto: UpdateUserdto) {
    const userId = req.user.userId;
    const updatedUser = await this.userservice.updateUser(
      userId,
      updateUserDto,
    );

    return updatedUser;
  }
}
