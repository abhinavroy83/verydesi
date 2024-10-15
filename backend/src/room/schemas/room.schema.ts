import { Types, Document, Schema, ObjectId } from 'mongoose';

export interface IRoom extends Document {
  UserId: ObjectId;
  postedon?: Date;
  renewedon: { type: Date };
  Title?: string;
  expiresAt?: Date;
  isVisible?: Boolean;
  postingincity?: string;
  postingtype?: string;
  Description?: string;
  Propertytype?: string;
  city?: string;
  Stay_lease?: string;
  Avaliblity_from?: string;
  Available_to?: string;
  Day_Available?: string;
  Attchd_Bath?: string;
  Preferred_gender?: string;
  Expected_Rooms?: number;
  negotiable?: boolean;
  hideRent?: boolean;
  Pricemodel?: string;
  Bath_Location?: string;
  Couples_welcome?: string;
  Desposite?: number;
  is_room_furnished?: string;
  Utility_include?: string[];
  Amenities_include?: string[];
  Vegeterian_prefernce?: string;
  Smoking_policy?: string;
  Pet_friendly?: string;
  Open_house_schedule?: string;
  Imgurl?: string[];
  user_name?: string;
  phone_number?: string;
  address?: string;
  state?: string;
  zip_code?: string;
  email?: string;
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
}

export const RoomSchema = new Schema({
  UserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  postedon: { type: Date, default: Date.now },
  renewedon: { type: Date },
  Title: { type: String },
  expiresAt: {
    type: Date,
    default: () => Date.now() + 90 * 24 * 60 * 60 * 1000,
    index: { expires: '90d' },
  },
  isVisible: { type: Boolean, default: true },
  postingincity: { type: String },
  postingtype: { type: String },
  Description: { type: String },
  Propertytype: { type: String },
  city: { type: String },
  Stay_lease: { type: String },
  Avaliblity_from: { type: String },
  Available_to: { type: String },
  Day_Available: { type: String },
  Attchd_Bath: { type: String },
  Preferred_gender: { type: String },
  Expected_Rooms: { type: Number },
  negotiable: { type: Boolean },
  hideRent: { type: Boolean },
  Pricemodel: { type: String },
  Bath_Location: { type: String },
  Couples_welcome: { type: String },
  Desposite: { type: Number },
  is_room_furnished: { type: String },
  Utility_include: { type: [String] },
  Amenities_include: { type: [String] },
  Vegeterian_prefernce: { type: String },
  Smoking_policy: { type: String },
  Pet_friendly: { type: String },
  Open_house_schedule: { type: String },
  Imgurl: { type: [String] },
  user_name: { type: String },
  phone_number: { type: String },
  address: { type: String },
  state: { type: String },
  zip_code: { type: String },
  email: { type: String },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});
RoomSchema.index({ location: '2dsphere' });
RoomSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
