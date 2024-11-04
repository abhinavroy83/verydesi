import { Module } from '@nestjs/common';
import { EventController } from './controller/event.controller';
import { EventService } from './service/event.service';
import { eventProvider } from './provider/event-provider';
import { DatabaseModule } from 'src/database/database.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [DatabaseModule, CacheModule.register(), RedisModule],
  controllers: [EventController],
  providers: [EventService, ...eventProvider],
})
export class EventModule {}
