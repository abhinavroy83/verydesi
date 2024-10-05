import { Model, Mongoose } from 'mongoose';
import { Favorite, FavoriteSchema } from '../schemas/favorite.schema';

export const FavoriteProvider = [
  {
    provide: 'FAVORITE_MODEL',
    useFactory: (mongoose: Mongoose): Model<Favorite> =>
      mongoose.model<Favorite>('wishlist', FavoriteSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
