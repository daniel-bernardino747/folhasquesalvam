import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User, Folder } from './';

export type PrepsDocument = Preps;

@Schema()
export class Preps {
  @Prop()
  id: number;

  @Prop()
  user_id: number;

  @Prop()
  folder_id: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true })
  folder: Folder;
}

export const PrepsSchema = SchemaFactory.createForClass(Preps);
