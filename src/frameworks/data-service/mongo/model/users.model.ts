import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User;

@Schema()
export class User {
  @Prop()
  id: number;

  @Prop()
  email: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
