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
import { CreateRoomDto, UpdateRoomDto } from '../dto';
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
        // console.log(cachedroom);
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
        {
          $or: [
            {
              postedon: { $lt: thirtyDaysAgo },
              renewedon: { $exists: false },
              isVisible: true,
            },
            { renewedon: { $lt: thirtyDaysAgo }, isVisible: true },
          ],
        },
        { $set: { isVisible: false } },
      );
      console.log('Room visibility updated for rooms older than 30 days');
    } catch (error) {
      console.error('Error updating room visibility:', error.message);
    }
  }

  async renewRoom(roomId: string) {
    const renewedDate = new Date();
    try {
      const updatedRoom = await this.roomModel.findByIdAndUpdate(
        roomId,
        { renewedon: renewedDate, postedon: renewedDate, isVisible: true },
        { new: true },
      );
      if (!updatedRoom) {
        throw new Error('Room not found');
      }
      return updatedRoom;
    } catch (error) {
      throw new Error(`Error renewing room: ${error.message}`);
    }
  }

  async deleteExpiredRooms() {
    const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
    try {
      // Delete rooms that were not renewed within 60 days
      const result = await this.roomModel.deleteMany({
        $or: [
          { postedon: { $lt: sixtyDaysAgo }, renewedon: { $exists: false } }, // Not renewed, 60 days after postedon
          { renewedon: { $lt: sixtyDaysAgo } }, // Renewed, 60 days after renewedon
        ],
      });
      console.log(`Deleted ${result.deletedCount} rooms expired after 60 days`);
    } catch (error) {
      console.error('Error deleting expired rooms:', error.message);
    }
  }

  async updateRoom(
    roomId: string,
    updateRoomDto: UpdateRoomDto,
    userId: string,
  ) {
    try {
      const room = await this.roomModel.findOne({
        _id: roomId,
        UserId: userId,
      });

      if (!room) {
        throw new NotFoundException(
          'Room not found or you are not authorized to update it',
        );
      }

      // Update the room with the new data
      const updatedRoom = await this.roomModel.findByIdAndUpdate(
        roomId,
        { $set: updateRoomDto },
        { new: true },
      );

      if (!updatedRoom) {
        throw new InternalServerErrorException('Failed to update the room');
      }

      return updatedRoom;
    } catch (error) {
      throw new Error(`Error while updating room: ${error.message}`);
    }
  }
}
