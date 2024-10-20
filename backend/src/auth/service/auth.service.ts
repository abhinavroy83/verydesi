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

      const hash = await argon.hash(dto.password);
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

      const jwttoken = await this.signToken(
        newUser._id.toString(),
        newUser.email,
      );
      return { message: 'User created. Please verify your email.', jwttoken };
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
      const passwordMatch = await argon.verify(user.password, dto.password);

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
        await user.save()
      }
      const jwttoken = await this.signToken(user._id.toString(), user.email);
      return { access_token: jwttoken };
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
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'f8220dd13ab2b9',
        pass: '64e618e922d9bd',
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
            <a href="http://apiv2.verydesi.com/auth/verifyemail/${token}" style="display: inline-block; padding: 10px 20px; background-color: #ff5722; color: #fff; text-decoration: none; border-radius: 5px;">
              verify email
            </a>
          </p>
          <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
          <p style="word-wrap: break-word;">
            <a href="http://apiv2.verydesi.com/auth/verifyemail/${token}">
              http://apiv2.verydesi.com/auth/verifyemail/${token}
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
