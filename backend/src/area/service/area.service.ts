import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { City } from '../schemas/area-schema';

@Injectable()
export class AreaService {
  constructor(@Inject('AREA_MODEL') private areamodel: Model<City>) {}

  async getallarea() {
    console.log('get all area');
  }
}
