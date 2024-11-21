import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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

  async SingleEvent(_id: string) {
    const cacheId = `event:${_id}`;

    try {
      let event = await this.cacheManager.get<Event>(cacheId);
      if (!event) {
        event = await this.eventmodel.findById(_id);
        if (!event) {
          throw new NotFoundException('Event not found');
        }
        await this.cacheManager.set(cacheId, event);
      }
      return event;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching event');
    }
  }

  async findallevent() {
    try {
      const allevent = await this.eventmodel.find();
      if (allevent.length <= 0) {
        throw new NotFoundException('there is no event');
      }

      return allevent;
    } catch (error) {
      throw new InternalServerErrorException('error while finding all event ');
    }
  }

  async geteventpostedbyuser(userId: string) {
    const cacheKey = 'userId: ${userId}';

    try {
      const cachedroom = await this.cacheManager.get<Event>(cacheKey);
      if (cachedroom) {
        return cachedroom;
      }
      const event = await this.eventmodel.find({ UserId: userId });
      if (!event) {
        throw new NotFoundException('no room found by user');
      }
      await this.cacheManager.set(cacheKey, event);

      return event;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong while fetching rooms',
      );
    }
  }
}
