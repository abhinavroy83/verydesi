import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from '../service/room.service';
import { CreateRoomDto, sendEmailDto, UpdateRoomDto } from '../dto';
import { JwtGuard } from 'src/auth/guard';

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

  @UseGuards(JwtGuard)
  @Get('listmyroom')
  getallroompostedbyuser(@Request() req) {
    const userId = req.user.userId;
    return this.roomService.getroompostedbyuser(userId);
  }

  @UseGuards(JwtGuard)
  @Post('post-room')
  async postroom(@Request() req, @Body() createroomdto: CreateRoomDto) {
    const userId = req.user.userId;
    return this.roomService.postroom(createroomdto, userId);
  }

  @Get('visibleRoomsByArea/:area')
  getVisibleRoomsByArea(@Param('area') area: string) {
    return this.roomService.getVisibleRoomsByArea(area);
  }
  @UseGuards(JwtGuard)
  @Post('renew-room/:roomId')
  async renewRoom(@Param('roomId') roomId: string) {
    return this.roomService.renewRoom(roomId);
  }

  @UseGuards(JwtGuard)
  @Patch('update-room/:roomId')
  async updateRoom(
    @Param('roomId') roomId: string,
    @Body() updateRoomDto: UpdateRoomDto,
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.roomService.updateRoom(roomId, updateRoomDto, userId);
  }
  @UseGuards(JwtGuard)
  @Delete('delete-room/:roomId')
  async deleteroom(@Param('roomId') roomId: string) {
    return this.roomService.DeleteRoom(roomId);
  }

  // send email to user on room request

  @Post('send-email-user')
  async sendEmailtouser(@Body() sendemaildto: sendEmailDto) {
    try {
      await this.roomService.sendEmail(sendemaildto);
      return { success: true };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
