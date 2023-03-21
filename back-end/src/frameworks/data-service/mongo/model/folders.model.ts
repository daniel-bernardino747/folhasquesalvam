import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './index';

export type FolderDocument = Folder;

@Schema()
export class Folder {
  @Prop()
  id: number;

  @Prop()
  user_id: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop()
  size: number;

  @Prop()
  content: string;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
