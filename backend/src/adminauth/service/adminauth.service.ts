import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { AdminUser } from '../schemas/adminUser.schema';
import { allPermissions, rolesConfig } from '../lib/roles.config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminauthService {
  constructor(
    @Inject('ADMIN_MODEL') private AdminUserModel: Model<AdminUser>,
    private jwt: JwtService,
  ) {}

  async createUser(
    email: string,
    password: string,
    role: string,
  ): Promise<AdminUser> {
    if (!rolesConfig[role]) {
      throw new ForbiddenException('Invalid role');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.AdminUserModel({
      email,
      password: hashedPassword,
      role,
      permissions: rolesConfig[role].defaultPermissions,
    });
    return user.save();
  }

  async signin(email: string, password: string) {
    const user = await this.AdminUserModel.findOne({ email }).exec();
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.signToken(user._id.toString(), user.email);
    }
  }

  async addPermissionToUser(
    email: string,
    permission: string,
  ): Promise<AdminUser> {
    if (!allPermissions.includes(permission)) {
      throw new ForbiddenException('Invalid permission');
    }
    const user = await this.AdminUserModel.findOne({ email }).exec();
    if (!user.permissions.includes(permission)) {
      user.permissions.push(permission);
      return user.save();
    }
    return user;
  }

  async removePermissionFromUser(
    email: string,
    permission: string,
  ): Promise<AdminUser> {
    const user = await this.AdminUserModel.findOne({ email }).exec();
    user.permissions = user.permissions.filter((p) => p !== permission);
    return user.save();
  }

  async getUser(email: string) {
    return this.AdminUserModel.findOne({ email }).exec();
  }

  async hasPermission(email: string, permission: string) {
    const user = await this.getUser(email);
    return user.role === 'admin' || user.permissions.includes(permission);
  }

  // send token
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
}
