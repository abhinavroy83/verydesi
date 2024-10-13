import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './s3.controller';
import { S3Service } from './s3.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MulterModule.register({
      storage: undefined, // Use memory storage
    }),
  ],
  controllers: [UploadController],
  providers: [S3Service],
})
export class UploadModule {}
