import { Module } from '@nestjs/common';
import { AreaController } from './controller/area.controller';
import { AreaService } from './service/area.service';

@Module({
  controllers: [AreaController],
  providers: [AreaService]
})
export class AreaModule {}
