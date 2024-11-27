import { Connection } from 'mongoose';
import { BusinessSchema } from '../schemas/business-schema';

export const businessProvider = [
  {
    provide: 'BUSINESS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Business', BusinessSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
