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
import { CreateRoomDto, sendEmailDto, UpdateRoomDto } from '../dto';
import * as cron from 'node-cron';
import * as nodemailer from 'nodemailer';

@Injectable()
export class RoomService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('ROOM_MODEL') private roomModel: Model<IRoom>,
  ) {
    cron.schedule('0 0 * * *', this.updateRoomVisibility);
    cron.schedule('0 1 * * *', this.deleteExpiredRooms);
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

  async getroompostedbyuser(userId: string) {
    const cacheKey = 'userId: ${userId}';

    try {
      const cachedroom = await this.cacheManager.get<IRoom>(cacheKey);
      if (cachedroom) {
        return cachedroom;
      }
      const room = await this.roomModel.find({ UserId: userId });
      if (!room) {
        throw new NotFoundException('no room found by user');
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

  async DeleteRoom(roomId: string) {
    try {
      const room = await this.roomModel.findByIdAndDelete({ _id: roomId });
      if (!room) {
        throw new NotFoundException('Room not found');
      }
      return { success: true, message: 'Room deleted successfully' };
    } catch (error) {
      throw new Error(`Error while delete room: ${error.message}`);
    }
  }

  //check below later

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

  //send email to owner
  async checkEmailStatus(userEmail: string, ownerEmail: string) {
    const redisKey = `${userEmail}:${ownerEmail}`;
    const emailSent = await this.cacheManager.get(redisKey);
    return emailSent ? { alreadySent: true } : { alreadySent: false };
  }

  async sendEmail(sendemaildto: sendEmailDto) {
    try {
      const redisKey = `${sendemaildto.userEmail}:${sendemaildto.ownerEmail}`;
      const emailSent = await this.cacheManager.get(redisKey);

      if (emailSent) {
        throw new Error('You have already sent a message to this room owner.');
      }
      const transport = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'f8220dd13ab2b9',
          pass: '64e618e922d9bd',
        },
      });
      await transport.sendMail({
        from: `"VeryDesi" <no-reply@verydesi.com>`,
        to: sendemaildto.ownerEmail,
        subject: 'New Message from a VeryDesi User',
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h1 style="background-color: #f8f8f8; padding: 10px 20px; border-bottom: 2px solid #e2e2e2; text-align: center; color: #ff5722;">
              Verydesi.com - New Message
            </h1>
            <p>Hello,</p>
            <p><strong>${sendemaildto.userName}</strong> (${sendemaildto.userEmail}) has sent you a message regarding your room listing on VeryDesi:</p>
            <p style="padding: 10px; border-left: 4px solid #ff5722; background-color: #f8f8f8;">
              ${sendemaildto.message}
            </p>
            <p>Room Link: <a href="${sendemaildto.RoomLink}" target="_blank">${sendemaildto.RoomLink}</a></p>

            <p>Please feel free to respond directly to the user via their email address.</p>
            <p style="color: #999; font-size: 12px; text-align: center;">
              &copy; ${new Date().getFullYear()} VeryDesi. All rights reserved.
            </p>
          </div>`,
      });

      await this.cacheManager.set(redisKey, true, 60 * 60 * 24); // 24 hours expiration
    } catch (error) {
      throw new Error('Error sending email.');
    }
  }
}
