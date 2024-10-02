import { Schema, Document } from 'mongoose';

export interface User extends Document {
  belongcity: string;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  phone_number?: string;
  IsEmailVerified: boolean;
  IsPhoneNumberVerified: boolean;
  userimg?: string;
  dob?: string;
  gender?: string;
  address?: string;
  city?: string;
  country?: string;
  state?: string;
  pin?: string;
  joinedon?: Date;
}

export const UserSchema = new Schema({
  belongcity: {
    type: String,
    default: 'Portland',
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  IsEmailVerified: { type: Boolean, default: false },
  IsPhoneNumberVerified: { type: Boolean, default: false },
  phone_number: { type: String },
  userimg: { type: String },
  dob: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'other'],
  },
  country: {
    type: String,
    // required: true,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
    // required: true,
  },
  address: {
    type: String,
  },
  pin: {
    type: String,
  },
  joinedon: {
    type: Date,
    default: Date.now,
  },
});
