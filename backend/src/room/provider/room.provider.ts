import { Model, Mongoose } from 'mongoose';
import { IRoom, RoomSchema } from '../schemas';

export const roomProviders = [
  {
    provide: 'ROOM_MODEL',
    useFactory: (mongoose: Mongoose): Model<IRoom> =>
      mongoose.model<IRoom>('room', RoomSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
