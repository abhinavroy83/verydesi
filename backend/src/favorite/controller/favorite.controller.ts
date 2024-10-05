import { FavoriteService } from '../service/favorite.service';
import {
  Body,
  Injectable,
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';

@Controller('favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}
  @UseGuards(JwtGuard)
  @Post('postAndUpdateFavorite')
  async PostAndUpdateFavorite(
    @Body() body: { roomId: string; status: boolean },
    @Request() req,
  ) {
    const UserId = req.user.userId;
    const result = await this.favoriteService.PostAndUpdateFavorite(
      UserId,
      body.roomId,
      body.status,
    );
    return result;
  }
  @UseGuards(JwtGuard)
  @Get('AlluserFavorite')
  async FindAllUserFavorite(@Request() req) {
    return await this.favoriteService.findWishlist(req.user.userId);
  }

  @UseGuards(JwtGuard)
  @Get('findfavoritebyId/:roomId')
  async findfavoritebyid(@Param('roomId') roomId: string, @Request() req) {
    const UserId = req.user.userId;
    return await this.favoriteService.findfavoritebyid(UserId, roomId);
  }
}
