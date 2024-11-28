import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Business } from '../schemas/business-schema';
import { Model } from 'mongoose';
import { JwtGuard } from 'src/auth/guard';
import { BusinessDto } from '../dto/post-business.dto';
import { BusinessService } from '../service/business.service';

@Controller('business')
export class BusinessController {
  constructor(private businessservice: BusinessService) {}

  @UseGuards(JwtGuard)
  @Post('postbusiness')
  async postbusiness(@Request() req, @Body() businessDto: BusinessDto) {
    const userId = req.user.userId;
    return this.businessservice.createBusiness(businessDto, userId);
  }

  @UseGuards(JwtGuard)
  @Get('list-my-business')
  getalleventpostedbyuser(@Request() req) {
    const userId = req.user.userId;
    return this.businessservice.getbusinessbyuser(userId);
  }
}
