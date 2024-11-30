import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  UserId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, default: Date.now() })
  postedOn: Date;

  @Prop({ required: true })
  eventpostingcity: string;

  @Prop({ required: true, minlength: 2 })
  eventTitle: string;

  @Prop({ required: true })
  eventType: string;

  @Prop({ required: true })
  eventprice: string;

  @Prop({ required: true, type: Date })
  startDate: Date;

  @Prop({ required: true })
  startTime: string;

  @Prop({ required: true, type: Date })
  endDate: Date;

  @Prop({ required: true })
  endTime: string;

  @Prop({ required: true })
  timeZone: string;

  @Prop({ required: true })
  repeatEvent: string;

  @Prop({ required: true, minlength: 10, maxlength: 500 })
  description: string;

  @Prop({ required: true })
  venueName: string;

  @Prop({ required: true })
  entryoption: string;

  @Prop()
  virtualurl?: string;

  @Prop()
  address?: string;

  @Prop()
  city?: string;

  @Prop()
  state?: string;

  @Prop()
  zipCode?: string;

  @Prop()
  country?: string;

  @Prop({
    type: [String],
    required: true,
    validate: [
      (val: string[]) => val.length > 0,
      'At least one language is required',
    ],
  })
  languages: string[];

  @Prop({ required: true })
  organization: string;

  @Prop({ required: true })
  hostedBy: string;

  @Prop()
  contactNumber?: string;

  @Prop({
    type: [
      {
        name: { type: String, required: true },
      },
    ],
    required: true,
    validate: [
      (val: { name: string }[]) => val.length > 0,
      'At least one artist is required',
    ],
  })
  artists: { name: string }[];

  @Prop({
    type: [String],
    validate: [
      (val: string[]) => val.length <= 5,
      'You can upload a maximum of 5 images',
    ],
  })
  images: string[];

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}

export const EventSchema = SchemaFactory.createForClass(Event);
