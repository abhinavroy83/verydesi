import { Controller, Get } from '@nestjs/common';
import { Adminroomservice } from '../service/adminroom.service';

@Controller('admin/room')
export class AdminRoomController {
  constructor(private adminroomservice: Adminroomservice) {}

  @Get('all-rooms')
  getallroom() {
    return this.adminroomservice.getallrooms();
  }

  
}
