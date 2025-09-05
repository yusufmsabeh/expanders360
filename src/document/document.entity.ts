import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Document {
  @Prop()
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop([String])
  tags: string[];

  @Prop({ name: 'project_id' })
  projectId: number;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);

export type DocumentDocument = HydratedDocument<Document>;
