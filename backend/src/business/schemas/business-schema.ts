import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type BusinessDocument = Business & Document;

@Schema({ timestamps: true })
export class Business {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'User' })
  UserId: MongooseSchema.Types.ObjectId;

  @Prop({ type: Date, required: true, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, required: true, default: Date.now() })
  updatedAt: Date;

  @Prop({ type: Boolean, required: true, default: false })
  isVerified: Boolean;

  @Prop({ type: String, enum: ['Approved', 'Pending'], default: 'Pending' })
  status: String;

  @Prop({ type: String, required: true })
  userName: string;

  @Prop({ type: String, required: true })
  userPhone: string;

  @Prop({ type: String, required: true })
  businessName: string;

  @Prop({ type: String, required: true })
  legalName: string;

  @Prop({ type: String, enum: ['business', 'service'], required: true })
  businessType: 'business' | 'service';

  @Prop({ type: [String], required: true })
  categories: string[];

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: false })
  website?: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({
    type: String,
    enum: ['ein', 'license', 'bill', 'registration', 'other'],
    required: true,
  })
  verificationMethod: 'ein' | 'license' | 'bill' | 'registration' | 'other';

  @Prop({ type: String, length: 9, required: false })
  einNumber?: string;

  @Prop({
    type: {
      monday: {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        is24Hours: { type: Boolean, required: true },
        isClosed: { type: Boolean, required: true },
      },
      tuesday: {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        is24Hours: { type: Boolean, required: true },
        isClosed: { type: Boolean, required: true },
      },
      wednesday: {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        is24Hours: { type: Boolean, required: true },
        isClosed: { type: Boolean, required: true },
      },
      thursday: {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        is24Hours: { type: Boolean, required: true },
        isClosed: { type: Boolean, required: true },
      },
      friday: {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        is24Hours: { type: Boolean, required: true },
        isClosed: { type: Boolean, required: true },
      }
    
    },
    required: true,
  })
  openHours: {
    monday: {
      startTime: string;
      endTime: string;
      is24Hours: boolean;
      isClosed: boolean;
    };
    tuesday: {
      startTime: string;
      endTime: string;
      is24Hours: boolean;
      isClosed: boolean;
    };
    wednesday: {
      startTime: string;
      endTime: string;
      is24Hours: boolean;
      isClosed: boolean;
    };
    thursday: {
      startTime: string;
      endTime: string;
      is24Hours: boolean;
      isClosed: boolean;
    };
    friday: {
      startTime: string;
      endTime: string;
      is24Hours: boolean;
      isClosed: boolean;
    };
  };

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: [String], required: true })
  languages: string[];

  @Prop({ type: String, required: true })
  pdfurl: string;

  @Prop({ type: [String], required: true })
  Imageurl: string[];

  @Prop({
    type: {
      description: { type: String, required: false },
      startDate: { type: Date, required: false },
      endDate: { type: Date, required: false },
      couponCodes: { type: String, required: false },
    },
    required: false,
  })
  sales?: {
    description?: string;
    startDate?: Date;
    endDate?: Date;
    couponCodes?: string;
  };
}

export const BusinessSchema = SchemaFactory.createForClass(Business);
