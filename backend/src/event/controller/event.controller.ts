import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EventService } from '../service/event.service';
import { JwtGuard } from 'src/auth/guard';
import { EventFormDTO } from '../dto';

@Controller('event')
export class EventController {
  constructor(private eventservice: EventService) {}

  @UseGuards(JwtGuard)
  @Post('postevent')
  async postevent(@Request() req, @Body() createeventdto: EventFormDTO) {
    const userId = req.user.userId;
    return this.eventservice.createEvent(createeventdto, userId);
  }

  @Get('getEventByArea/:area')
  geteventbyarea(@Param('area') area: string) {
    return this.eventservice.findEventbycity(area);
  }

  @Get('find_event_by_id/:_id')
  geteventbyid(@Param('_id') _id: string) {
    if (!_id) {
      throw new NotFoundException('Id is not available');
    }
    return this.eventservice.SingleEvent(_id);
  }

  @UseGuards(JwtGuard)
  @Get('list-my-event')
  getallroompostedbyuser(@Request() req) {
    const userId = req.user.userId;
    return this.eventservice.geteventpostedbyuser(userId);
  }

  @Get('find-all-event')
  getallevent() {
    return this.eventservice.findallevent();
  }
}
