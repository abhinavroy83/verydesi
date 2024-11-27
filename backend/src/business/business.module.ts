import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisModule } from '@nestjs-modules/ioredis';
import { BusinessController } from './controller/business.controller';
import { BusinessService } from './service/business.service';
import { businessProvider } from './provider/business.provider';

@Module({
  imports: [DatabaseModule, CacheModule.register(), RedisModule],
  controllers: [BusinessController],
  providers: [BusinessService, ...businessProvider],
})
export class BusinessModule {}
