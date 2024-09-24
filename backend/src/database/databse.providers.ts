import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      try {
        const dbConnection = await mongoose.connect(process.env.MONGODB_URL);

        console.log('Database connected successfully');
        return dbConnection;
      } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
      }
    },
  },
];
