import { Module } from '@nestjs/common';
import { UserController } from './Controller/user.controller';
import { UserService } from './Service/user.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { authProviders } from 'src/auth/Provider/auth.provider';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({}),
    CacheModule.register(),
    RedisModule,
  ],

  controllers: [UserController],
  providers: [UserService, ...authProviders],
})
export class UserModule {}
