import { Schema, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  IsEmailVerified: boolean;
}

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  IsEmailVerified: { type: Boolean, default: false },
});
