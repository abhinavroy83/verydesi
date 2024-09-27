import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { authProviders } from './Provider/auth.provider';
import { AuthController } from './controller';
import { AuthEmailVerify, ForgotPasswordService, UniqueEmailVerify } from './service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [DatabaseModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    ...authProviders,
    AuthEmailVerify,
    ForgotPasswordService,
    UniqueEmailVerify,
    JwtStrategy,
  ],
})
export class AuthModule {}
