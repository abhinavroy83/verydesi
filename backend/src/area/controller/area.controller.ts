import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { AreaService } from '../service/area.service';
import { JwtGuard } from 'src/auth/guard';

@Controller('area')
export class AreaController {
  constructor(private areaservice: AreaService) {}

  @UseGuards(JwtGuard)
  @Get('get-all-area')
  getallarea(@Request() req) {
    console.log(req.user.userId);
    // const id = req.user._id;
    return this.areaservice.getallarea();
  }
}
