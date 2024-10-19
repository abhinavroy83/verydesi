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
    let user = await this.userModel.findOne({ phone_number });

    // If user does not exist, create a new user
    if (!user) {
      user = new this.userModel({
        phone_number,
        otp: otpcode,
        otpExpires: Date.now() + 10 * 60 * 1000, // OTP expiration time
        IsPhoneNumberVerified: false, // Set phone number as not verified initially
      });

      await user.save();
    } else {
      // If user exists, update the OTP and expiration
      user.otp = otpcode;
      user.otpExpires = Date.now() + 10 * 60 * 1000;
      await user.save();
    }
    try {
      const response = await this.twilioClient.verify
        .services(process.env.TWILIO_VERIFY_SERVICE_SID)
        .verifications.create({
          to: phone_number,
          channel: 'sms', // Can also use 'call' for voice OTP
        });

      console.log(`OTP sent to ${phone_number}`);
    } catch (error) {
      console.error('Error sending OTP via SMS', error);
      throw new Error('Failed to send OTP');
    }
  }

  async verifyOtp(phone_number: string, otp: string): Promise<boolean> {
    try {
      // Verify OTP using Twilio Verify API
      const response = await this.twilioClient.verify
        .services(process.env.TWILIO_VERIFY_SERVICE_SID)
        .verificationChecks.create({
          to: phone_number,
          code: otp,
        });

      if (response.status === 'approved') {
        // OTP is correct
        const user = await this.userModel.findOne({ phone_number });
        if (user) {
          user.IsPhoneNumberVerified = true; // Mark as verified
          await user.save();
        }
        return true;
      }

      return false; // OTP mismatch or expired
    } catch (error) {
      console.error('Error verifying OTP', error);
      throw new Error('Failed to verify OTP');
    }
  }
}
