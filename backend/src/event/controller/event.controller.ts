import {
  Body,
  Controller,
  Get,
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
}
