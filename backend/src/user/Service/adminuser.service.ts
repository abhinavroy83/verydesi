import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas';

export class AdiminUserService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('USER_MODEL') private userModel: Model<User>,
  ) {}

  async listAllUser() {
    try {
      const users = await this.userModel.find();
      if (users.length === 0) {
        throw new NotFoundException('No users found');
      }
      return users;
    } catch (error) {
      throw new UnauthorizedException(
        'Something wrong while getting user details',
      );
    }
  }
}
