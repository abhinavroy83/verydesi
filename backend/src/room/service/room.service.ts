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
import { CreateRoomDto } from '../dto';
import * as cron from 'node-cron';

@Injectable()
export class RoomService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('ROOM_MODEL') private roomModel: Model<IRoom>,
  ) {
    cron.schedule('0 0 * * *', this.updateRoomVisibility);
  }
  async getAllRoomByArea(area: string) {
    const cacheKey = `area: ${area}`;

    try {
      const cachedrooms = await this.cacheManager.get<IRoom>(cacheKey);
      if (cachedrooms) {
        // console.log(cachedrooms);
        return { message: null, rooms: cachedrooms };
      }
      const rooms = await this.roomModel.find({ postingincity: area });
      // console.log(rooms);
      if (!rooms || rooms.length === 0) {
        return { message: `No rooms found in ${area}`, rooms: [] };
      }
      await this.cacheManager.set(cacheKey, rooms);
      return { message: null, rooms };
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

  async postroom(createroomdto: CreateRoomDto, userId: string) {
    try {
      // Assign userId to the room data
      const roomData = {
        ...createroomdto,
        UserId: userId,
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // Set expiration after 90 days
        isVisible: true, // Initially visible
      };

      // Create a new room instance
      const newRoom = new this.roomModel(roomData);

      // Save the room to the database
      return await newRoom.save();
    } catch (error) {
      // Handle error (can log or throw custom exceptions here)
      throw new Error(`Error while posting room: ${error.message}`);
    }
  }

  async getVisibleRoomsByArea(area: string) {
    try {
      return await this.roomModel.find({
        postingincity: area,
        isVisible: true,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching visible rooms');
    }
  }

  async updateRoomVisibility() {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    try {
      // Find rooms that are older than 30 days and are still visible
      await this.roomModel.updateMany(
        { postedon: { $lt: thirtyDaysAgo }, isVisible: true },
        { $set: { isVisible: false } }, // Set visibility to false
      );
      console.log('Room visibility updated for rooms older than 30 days');
    } catch (error) {
      console.error('Error updating room visibility:', error.message);
    }
  }
}
