import { Module } from '@nestjs/common';
import { AdminauthController } from './controller/adminauth.controller';
import { AdminauthService } from './service/adminauth.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminauthProvider } from './provider/adminuser.provider';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [DatabaseModule, JwtModule.register({})],
  controllers: [AdminauthController],
  providers: [AdminauthService, ...AdminauthProvider, JwtStrategy],
})
export class AdminauthModule {}
