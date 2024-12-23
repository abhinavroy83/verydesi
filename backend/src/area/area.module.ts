import { Module } from '@nestjs/common';
import { AreaController } from './controller/area.controller';
import { AreaService } from './service/area.service';
import { areaProvider } from './provider/area-provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AreaController],
  providers: [AreaService, ...areaProvider],
})
export class AreaModule {}
