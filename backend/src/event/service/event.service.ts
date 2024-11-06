import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Event } from '../schemas/event-schema';
import { Model } from 'mongoose';
import { EventFormDTO } from '../dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_MODEL') private eventmodel: Model<Event>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createEvent(
    createeventdto: EventFormDTO,
    userId: string,
  ): Promise<Event> {
    try {
      const eventdata = {
        ...createeventdto,
        UserId: userId,
      };

      const newEvent = new this.eventmodel(eventdata);
      return newEvent.save();
    } catch (error) {
      throw new Error('Error while posting event');
    }
  }

  async findEventbycity(area: string): Promise<Event[]> {
    const cacheKey = `area: ${area}`;
    try {
      const cachedevent = await this.cacheManager.get<Event[]>(cacheKey);
      if (cachedevent) {
        return cachedevent;
      }

      const events = await this.eventmodel.find({ eventpostingcity: area });

      await this.cacheManager.set(cacheKey, events, 3600);
      return events;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong while fetching events',
      );
    }
  }
  
}
