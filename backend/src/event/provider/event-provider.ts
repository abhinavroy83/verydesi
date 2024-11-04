import mongoose, { Connection, connection, Mongoose } from 'mongoose';
import { EventSchema } from '../schemas/event-schema';

export const eventProvider = [
  {
    provide: 'EVENT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Event', EventSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
