import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class City {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  AdminID: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, enum: ['Usa', 'Canada'] })
  country: string;

  @Prop({ type: [String], required: true })
  state: string[];

  @Prop({ type: String, required: true })
  primaryState: string;

  @Prop({ type: String, required: true })
  area: string;

  @Prop({ type: [String], default: [] })
  subarea: string[];

  @Prop({ type: [String], default: [] })
  zipcode: string[];
}

export const AreaSchema = SchemaFactory.createForClass(City);
