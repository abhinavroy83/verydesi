import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from '../schemas';

@Injectable()
export class AuthEmailVerify {
  constructor(
    @Inject('USER_MODEL') private userModel: Model<User>,
    private jwt: JwtService,
  ) {}
  async verifyEmail(token: string) {
    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: process.env.JWTSECETCODE,
      });

      // Update the user's email verification status
      const user = await this.userModel.findById(payload.sub);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      user.IsEmailVerified = true;
      await user.save();
      return { message: 'Email successfully verified' };
    } catch (error) {
      throw new BadRequestException('Invalid or expired token');
    }
  }
}
