import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { Authsignindto, Authsignupdto } from '../dto';
import { Model } from 'mongoose';
import { User } from '../schemas';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private client: OAuth2Client;

  constructor(
    @Inject('USER_MODEL') private userModel: Model<User>,
    private jwt: JwtService,
  ) {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }
  async signup(dto: Authsignupdto) {
    try {
      //check for existinguser
      const existinguser = await this.userModel.findOne({ email: dto.email });
      if (existinguser) {
        throw new BadRequestException('User Already exists');
      }

      const hash = await bcrypt.hash(dto.password, 10);
      const newUser = new this.userModel({
        ...dto,
        password: hash,
      });
      await newUser.save();

      //send verification email
      const verificationToken = await this.createVerificationToken(
        newUser._id.toString(),
      );
      await this.sendVerificationEmail(
        newUser.email,
        verificationToken.Email_token,
      );

      return this.signToken(newUser._id.toString(), newUser.email);
    } catch (error) {
      throw error;
    }
  }

  async signin(dto: Authsignindto) {
    try {
      const user = await this.userModel.findOne({ email: dto.email });
      if (!user) {
        throw new UnauthorizedException('user not find');
      }

      //compare passs
      const passwordMatch = await bcrypt.compare(dto.password, user.password);

      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return this.signToken(user._id.toString(), user.email);
    } catch (error) {
      throw error;
    }
  }

  async googlelogin(token: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const email = payload?.email;
      const firstName = payload?.name;
      let user = await this.userModel.findOne({ email });
      if (!user) {
        user = new this.userModel({ email, firstName });
        user.IsEmailVerified = true;
        await user.save();
      }
      // const jwttoken = await this.signToken(user._id.toString(), user.email);
      return this.signToken(user._id.toString(), user.email);
    } catch (error) {
      console.error('Error verifying Google token', error);
      throw new UnauthorizedException('Invalid Google token');
    }
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15d',
      secret: process.env.JWTSECETCODE,
    });
    return { access_token: token };
  }

  //send email verification again
  async sendemailagain(userId: string, useremail: string) {
    try {
      const verificationToken = await this.createVerificationToken(
        userId.toString(),
      );
      await this.sendVerificationEmail(
        useremail,
        verificationToken.Email_token,
      );
      return { msg: 'email send successfully' };
    } catch (error) {
      throw new UnauthorizedException('Error at sendemail');
    }
  }

  //verification token
  async createVerificationToken(
    userId: string,
  ): Promise<{ Email_token: string }> {
    const payload = { sub: userId };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '10m',
      secret: process.env.JWTSECETCODE,
    });
    return { Email_token: token };
  }

  async sendVerificationEmail(email: string, token: string) {
    const transport = nodemailer.createTransport({
      host: 'live.smtp.mailtrap.io',
      port: 587,
      auth: {
        user: 'smtp@mailtrap.io',
        pass: 'fb6024e6b348ed1e4b070b0e231d0d4f',
      },
    });

    await transport.sendMail({
      from: `"VeryDesi" <no-reply@verydesi.com>`,
      to: email,
      subject: 'Email Verification',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h1 style="background-color: #f8f8f8; padding: 10px 20px; border-bottom: 2px solid #e2e2e2; text-align: center; color: #ff5722;">
            Verydesi.com
          </h1>
          <p>Dear <strong>username</strong>,</p>
          <p>Thank you for registering up on VeryDesi.com! To activate your account and start exploring, please click the verification link below:</p>
          <p style="text-align: center;">
            <a href="https://apiv2.verydesi.com/auth/verifyemail/${token}" style="display: inline-block; padding: 10px 20px; background-color: #ff5722; color: #fff; text-decoration: none; border-radius: 5px;">
              verify email
            </a>
          </p>
          <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
          <p style="word-wrap: break-word;">
            <a href="https://apiv2.verydesi.com/auth/verifyemail/${token}">
              https://apiv2.verydesi.com/auth/verifyemail/${token}
            </a>
          </p>
          <p><strong>Note:</strong> This link will expire in 10 minutes.</p>
          <p style="color: #999; font-size: 12px; text-align: center;">
            This is an automated email, please do not reply.
          </p>
          <p style="color: #999; font-size: 12px; text-align: center;">
            &copy; ${new Date().getFullYear()} VeryDesi. All rights reserved.
          </p>
        </div>`,
    });
  }
}
