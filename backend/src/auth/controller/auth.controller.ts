import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import {
  Authsignindto,
  Authsignupdto,
  AuthValidEmail,
  AuthValidPassword,
} from '../dto';
import { AuthEmailVerify, ForgotPasswordService } from '../service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authEmailVerify: AuthEmailVerify,
    private forgotPasswordService: ForgotPasswordService,
  ) {}

  @Post('signup')
  signup(@Body() dto: Authsignupdto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: Authsignindto) {
    return this.authService.signin(dto);
  }

  @Get('verifyemail/:token')
  AuthEmailVerify(@Param('token') token: string) {
    return this.authEmailVerify.verifyEmail(token);
  }

  @Post('forgot-password')
  sendPasswordResetEmail(@Body() email: AuthValidEmail) {
    return this.forgotPasswordService.sendPasswordResetEmail(email);
  }

  @Post('reset-password/:token')
  resetpassword(
    @Param('token') token: string,
    @Body() password: AuthValidPassword,
  ) {
    return this.forgotPasswordService.resetpassword(token, password);
  }
}
