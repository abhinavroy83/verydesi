import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { IRoom } from '../schemas';
import { Model } from 'mongoose';

@Injectable()
export class Adminroomservice {
  constructor(@Inject('ROOM_MODEL') private roomModel: Model<IRoom>) {}

  async getallrooms() {
    try {
      const room = await this.roomModel.find();
      if (room.length === 0) {
        return ' there is no room';
      }

      return room;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong while fetching rooms',
      );
    }
  }
}
