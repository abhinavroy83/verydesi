import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthValidEmail, AuthValidPassword } from '../dto';
import { Model } from 'mongoose';
import { User } from '../schemas';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import * as argon from 'argon2';

@Injectable()
export class ForgotPasswordService {
  constructor(
    @Inject('USER_MODEL') private userModel: Model<User>,
    private jwt: JwtService,
  ) {}

  async sendPasswordResetEmail(email: AuthValidEmail) {
    try {
      const user = await this.userModel.findOne(email);
      if (!user) {
        throw new BadRequestException('User Not Found');
      }
      const jwttoken = await this.jwt.signAsync(
        { sub: user._id },
        {
          expiresIn: '15m',
          secret: process.env.JWTSECETCODE,
        },
      );
      await this.sendemailverification(user.email, jwttoken);
      return { msg: 'Sucessfully Email Send' };
    } catch (error) {
      throw new UnauthorizedException(
        'Something went wrong while sending reset email',
      );
    }
  }

  async resetpassword(token: string, password: AuthValidPassword) {
    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: process.env.JWTSECETCODE,
      });
      const user = await this.userModel.findById(payload.sub);
      if (!user) {
        throw new BadRequestException('Invalid token or user does not exist');
      }
      const hash = await argon.hash(password.password);
      user.password = hash;
      await user.save();
      //sending confirmation email to user after password chnage
      await this.sendPasswordChangeConfirmation(user.email);
      return { msg: 'Sucessfully Password update' };
    } catch (error) {
      throw new UnauthorizedException('Failed to reset password');
    }
  }

  //send email to reset password
  async sendemailverification(email: string, token: string) {
    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'f8220dd13ab2b9',
        pass: '64e618e922d9bd',
      },
    });

    await transport.sendMail({
      from: 'no-reply@verydesi.com',
      to: email,
      subject: 'Reset Your Password',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h1 style="background-color: #f8f8f8; padding: 10px 20px; border-bottom: 2px solid #e2e2e2; text-align: center; color: #ff5722;">
            Password Reset Request
          </h1>
          <p>Dear <strong>username</strong>,</p>
          <p>We received a request to reset your password. Click the link below to proceed:</p>
          <p style="text-align: center;">
            <a href="http://localhost:8000/auth/reset-password/${token}" style="display: inline-block; padding: 10px 20px; background-color: #ff5722; color: #fff; text-decoration: none; border-radius: 5px;">
              Reset Password
            </a>
          </p>
          <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
          <p style="word-wrap: break-word;">
            <a href="http://localhost:8000/auth/reset-password/${token}">
              http://localhost:8000/auth/reset-password/${token}
            </a>
          </p>
          <p><strong>Note:</strong> This link will expire in 10 minutes.</p>
          <p>If you didn't request a password reset, you can safely ignore this email.</p>
          <p style="color: #999; font-size: 12px; text-align: center;">
            This is an automated email, please do not reply.
          </p>
          <p style="color: #999; font-size: 12px; text-align: center;">
            &copy; ${new Date().getFullYear()} VeryDesi. All rights reserved.
          </p>
        </div>
      `,
    });
  }
  async sendPasswordChangeConfirmation(email: string) {
    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'f8220dd13ab2b9',
        pass: '64e618e922d9bd',
      },
    });

    await transport.sendMail({
      from: 'no-reply@verydesi.com',
      to: email,
      subject: 'Password Successfully Changed',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h1 style="background-color: #f8f8f8; padding: 10px 20px; border-bottom: 2px solid #e2e2e2; text-align: center; color: #ff5722;">
            Password Change Confirmation
          </h1>
          <p>Dear <strong>User</strong>,</p>
          <p>Your password has been successfully changed.</p>
          <p>If you did not perform this change, please contact our support immediately.</p>
          <p style="color: #999; font-size: 12px; text-align: center;">
            This is an automated email, please do not reply.
          </p>
          <p style="color: #999; font-size: 12px; text-align: center;">
            &copy; ${new Date().getFullYear()} VeryDesi. All rights reserved.
          </p>
        </div>
      `,
    });
  }
}
