import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('USER_MODEL') private userModel: Model<User>,
  ) {}
  async getUserProfile(userId: string) {
    const cacheKey = `user:${userId}`;
    console.log(cacheKey);
    try {
      const cachedUser = await this.cacheManager.get<User>(cacheKey);
      if (cachedUser) {
        console.log('User fetched from cache:', cachedUser);
        return cachedUser;
      }
      const user = await this.userModel
        .findById({ _id: userId })
        .select('-password');
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const ttl = 600;
      await this.cacheManager.set(cacheKey, user);
      console.log('User set in cache with key:', cacheKey);

      return user;
    } catch (error) {
      throw new UnauthorizedException(
        'Something wrong while getting user details',
      );
    }
  }
}