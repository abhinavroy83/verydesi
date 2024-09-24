import { Module } from '@nestjs/common';
import { CacheModule, CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync<CacheModuleOptions>({
      imports: [ConfigModule],
      useFactory: async () => {
        console.log('Connecting to Redis:', {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
        });
        return {
          store: redisStore,
          socket: {
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
          },
          ttl: 600,
        };
      },
    }),
  ],
})
export class RedisModule {}
