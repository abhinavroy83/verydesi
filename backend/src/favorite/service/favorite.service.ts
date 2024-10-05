import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Favorite } from '../schemas/favorite.schema';

@Injectable()
export class FavoriteService {
  constructor(
    @Inject('FAVORITE_MODEL') private favoriteModel: Model<Favorite>,
  ) {}

  async PostAndUpdateFavorite(UserId: string, roomId: string, status: boolean) {
    let wishlist = await this.favoriteModel.findOne({ UserId });

    if (!wishlist) {
      if (status) {
        // Create new wishlist if it doesn't exist and status is true
        wishlist = new this.favoriteModel({
          UserId,
          rooms: [{ roomId, status }],
        });
        await wishlist.save();
        return { msg: 'Successfully added' };
      } else {
        throw new BadRequestException('Wishlist not found, cannot remove');
      }
    }

    const roomIndex = wishlist.rooms.findIndex((r) => r.roomId === roomId);

    if (status) {
      if (roomIndex === -1) {
        wishlist.rooms.push({ roomId, status });
      } else {
        wishlist.rooms[roomIndex].status = status;
      }
    } else {
      if (roomIndex !== -1) {
        wishlist.rooms.splice(roomIndex, 1);
        if (wishlist.rooms.length === 0) {
          await this.favoriteModel.deleteOne({ UserId });
          return { msg: 'Wishlist cleared' };
        }
      } else {
        throw new BadRequestException('Room not found in wishlist');
      }
    }

    await wishlist.save();
    return { msg: status ? 'Successfully updated' : 'Successfully removed' };
  }

  async findWishlist(UserId: string) {
    const wishlist = await this.favoriteModel.findOne({ UserId });

    if (!wishlist) {
      throw new NotFoundException('Wishlist not found for the user');
    }

    return {
      msg: 'Success',
      wishlist,
      count: wishlist.rooms.length,
    };
  }
  async findfavoritebyid(UserId: string, roomId: string) {
    try {
      // Find wishlist for the given user
      const wishlist = await this.favoriteModel.findOne({ UserId });

      if (!wishlist) {
        return {
          status: 'not found',
          msg: 'Room not found in any wishlist',
        };
      }

      const room = wishlist.rooms.find((r) => r.roomId === roomId);

      if (room) {
        return {
          msg: 'Success',
          status: room.status,
        };
      }

      return {
        status: false,
        msg: 'Room not found in wishlist',
      };
    } catch (error) {
      console.error('Error during fetching wishlist status:', error);
      throw new BadRequestException('Internal Server Error');
    }
  }
}
