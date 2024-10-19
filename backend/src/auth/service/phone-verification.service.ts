import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../schemas';
import { Twilio } from 'twilio';
@Injectable()
export class phoneverify {
  private twilioClient: Twilio;

  constructor(@Inject('USER_MODEL') private userModel: Model<User>) {
    this.twilioClient = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  generateOtp(length: number = 6): string {
    return Math.floor(100000 * Math.random() * 900000).toString();
  }
  async SendOtp(phone_number: string): Promise<void> {
    const otpcode = this.generateOtp();
    const user = await this.userModel.findByIdAndUpdate(
      { phone_number },
      { otp: otpcode, otpExpires: Date.now() + 10 * 60 * 1000 },
      { new: true },
    );

    if (!user) {
      throw new Error('user not found');
    }
    try {
      await this.twilioClient.messages.create({
        body: `Your OTP code is ${otpcode}`,
        from: process.env.TWILIO_MESSAGING_SERVICE_SID,
        to: phone_number,
      });
      console.log(`OTP sent to ${phone_number}`);
    } catch (error) {
      console.error('Error sending OTP via SMS', error);
      throw new Error('Failed to send OTP');
    }
  }

  async verifyOtp(phone_number: string, otp: string): Promise<boolean> {
    const user = await this.userModel.findOne({ phone_number });

    if (!user || user.otpExpires < Date.now()) {
      throw new Error('OTP expired or invalid');
    }

    if (user.otp === otp) {
      // OTP matches, so you can verify the user
      user.otp = undefined; // Clear OTP
      user.otpExpires = undefined; // Clear OTP expiry
      user.IsPhoneNumberVerified = true;
      await user.save(); // Save changes
      return true; // Success
    }

    return false; // OTP mismatch
  }
}
