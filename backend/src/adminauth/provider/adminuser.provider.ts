import mongoose, { Connection, connection, Mongoose } from 'mongoose';
import { AdminUserSchema } from '../schemas/adminUser.schema';

export const AdminauthProvider = [
  {
    provide: 'ADMIN_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('AdminUser', AdminUserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
