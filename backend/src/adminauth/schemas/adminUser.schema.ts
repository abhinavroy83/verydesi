import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = AdminUser & Document;

@Schema()
export class AdminUser {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['admin', 'manager', 'customer_support'] })
  role: string[];

  @Prop({ required: true, unique: true })
  permissions: string[];
}

export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);
