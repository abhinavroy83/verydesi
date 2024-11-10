import { Module } from '@nestjs/common';
import { AdminauthController } from './controller/adminauth.controller';
import { AdminauthService } from './service/adminauth.service';

@Module({
  controllers: [AdminauthController],
  providers: [AdminauthService]
})
export class AdminauthModule {}
