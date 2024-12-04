import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
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
    console.log(userId);
    return this.businessservice.getbusinessbyuser(userId);
  }

  @Get('get-single-business/:_id')
  getbusinessbyid(@Param('_id') _id: string) {
    if (!_id) {
      throw new NotFoundException('Id is not available');
    }
    return this.businessservice.getbusiness(_id);
  }

  @Get('find-all-business')
  getallevent() {
    return this.businessservice.getallbusiness();
  }

  @Delete('delete-business/:businessid')
  async deleteevent(@Param('businessid') businessid: string) {
    return this.businessservice.deletebusinessevent(businessid);
  }
}
