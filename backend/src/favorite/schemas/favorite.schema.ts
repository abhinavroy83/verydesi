import { Document, ObjectId, Schema } from 'mongoose';

interface Room {
  roomId: string;
  status: boolean;
}

export interface Favorite extends Document {
  UserId: ObjectId;
  rooms: Room[];
}

export const FavoriteSchema = new Schema<Favorite>({
  UserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rooms: [
    {
      roomId: { type: String, required: true },
      status: { type: Boolean, required: true },
    },
  ],
});
