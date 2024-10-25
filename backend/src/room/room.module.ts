import { Module } from '@nestjs/common';
import { RoomController } from './controller/room.controller';
import { RoomService } from './service/room.service';
import { DatabaseModule } from 'src/database/database.module';
import { roomProviders } from './provider/room.provider';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisModule } from '@nestjs-modules/ioredis';
import { AdminRoomController } from './controller/adminroom.controller';
import { Adminroomservice } from './service/adminroom.service';

@Module({
  imports: [DatabaseModule, CacheModule.register(), RedisModule],
  controllers: [RoomController, AdminRoomController],
  providers: [RoomService, ...roomProviders, Adminroomservice],
})
export class RoomModule {}
