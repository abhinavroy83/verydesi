import { Controller, Get, Param } from '@nestjs/common';
import { RoomService } from '../service/room.service';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get('ListingAllRoomByArea/:area')
  getAllRoomByArea(@Param('area') area: string) {
    return this.roomService.getAllRoomByArea(area);
  }

  @Get('findsingleRoom/:_id')
  getsingleroom(@Param('_id') _id: string) {
    return this.roomService.getsingleroom(_id);
  }
}
