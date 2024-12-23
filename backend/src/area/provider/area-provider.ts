import { Connection } from 'mongoose';
import { AreaSchema } from '../schemas/area-schema';

export const areaProvider = [
  {
    provide: 'AREA_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('city', AreaSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
