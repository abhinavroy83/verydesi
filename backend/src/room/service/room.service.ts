import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { IRoom } from '../schemas';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RoomService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('ROOM_MODEL') private roomModel: Model<IRoom>,
  ) {}
  async getAllRoomByArea(area: string) {
    const cacheKey = 'area: ${area}';

    try {
      const cachedrooms = await this.cacheManager.get<IRoom>(cacheKey);
      if (cachedrooms) {
        console.log(cachedrooms);
        return cachedrooms;
      }
      const rooms = await this.roomModel.find({ postingincity: area });
      console.log(rooms);
      if (!rooms || rooms.length === 0) {
        return { message: `No rooms found in ${area}`, rooms: [] };
      }
      await this.cacheManager.set(cacheKey, rooms);
      return rooms;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong while fetching rooms',
      );
    }
  }

  async getsingleroom(_id: string) {
    const cacheKey = 'id: ${_id}';
    try {
      const cachedroom = await this.cacheManager.get<IRoom>(cacheKey);
      if (cachedroom) {
        console.log(cachedroom);
        return cachedroom;
      }
      const room = await this.roomModel.findById(_id);
      if (!room) {
        throw new NotFoundException('Cant find the room');
      }
      await this.cacheManager.set(cacheKey, room);

      return room;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong while fetching rooms',
      );
    }
  }
}
