import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthEmailVerify } from './email-verification.service';
import { Model } from 'mongoose';
import { User } from '../schemas';
@Injectable()
export class UniqueEmailVerify {
  constructor(@Inject('USER_MODEL') private userModel: Model<User>) {}
  async uniqueEmail(email: AuthEmailVerify) {
    try {
    //   console.log(email);
      const existinguser = await this.userModel.findOne({ email });

      if (existinguser) {
        return { success: false, message: 'Email already exists' };
      }
      return { success: true, message: 'Email available' };
    } catch (error) {
      throw new UnauthorizedException('Something went wrong at unqiue email');
    }
  }
}
