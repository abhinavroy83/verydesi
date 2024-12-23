import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { RoomModule } from './room/room.module';
import { FavoriteModule } from './favorite/favorite.module';
import { UploadModule } from './s3/s3.module';
import { EventModule } from './event/event.module';
import { AdminauthModule } from './adminauth/adminauth.module';
import { BusinessService } from './business/service/business.service';
import { BusinessController } from './business/controller/business.controller';
import { BusinessModule } from './business/business.module';
import { AreaModule } from './area/area.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    DatabaseModule,
    RedisModule,
    RoomModule,
    FavoriteModule,
    UploadModule,
    EventModule,
    AdminauthModule,
    BusinessModule,
    AreaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
