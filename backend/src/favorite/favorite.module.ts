import { Module } from '@nestjs/common';
import { FavoriteService } from './service/favorite.service';
import { FavoriteController } from './controller/favorite.controller';
import { FavoriteProvider } from './Provider/Favorite.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FavoriteController],
  providers: [FavoriteService, ...FavoriteProvider],
})
export class FavoriteModule {}
