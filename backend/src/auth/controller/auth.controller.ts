import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import {
  Authsignindto,
  Authsignupdto,
  Authupdatpassword,
  AuthValidEmail,
  AuthValidPassword,
} from '../dto';
import {
  AuthEmailVerify,
  ForgotPasswordService,
  UniqueEmailVerify,
} from '../service';
import { JwtGuard } from '../guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authEmailVerify: AuthEmailVerify,
    private forgotPasswordService: ForgotPasswordService,
    private uniqueEmailVerify: UniqueEmailVerify,
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

  @Get('check-unique-email/:email')
  uniqueEmail(@Param('email') email: AuthEmailVerify) {
    return this.uniqueEmailVerify.uniqueEmail(email);
  }
  @UseGuards(JwtGuard)
  @Patch('update-password')
  updatepassword(@Request() req, @Body() password: Authupdatpassword) {
    const userId = req.user.userId;
    return this.forgotPasswordService.updatepassword(userId, password);
  }

  @UseGuards(JwtGuard)
  @Delete('delete-account')
  deleteaccount(@Request() req, @Body() password: AuthValidPassword) {
    const userId = req.user.userId;
    return this.forgotPasswordService.deleteAccount(userId, password);
  }
}
