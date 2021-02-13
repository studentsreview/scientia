import { Field, ID, ObjectType } from '@nestjs/graphql';
import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'courses' } })
@ObjectType()
export class Course {
  @Field(() => ID)
  _id: string;

  @prop()
  @Field()
  name: string;

  @prop()
  @Field()
  department: string;

  @prop({ default: false })
  @Field()
  sectioned: boolean;

  @prop({ type: [String], default: [] })
  @Field(() => [String])
  prerequisites: string[];

  @prop()
  @Field()
  notes: string;

  @prop()
  @Field()
  length: string;

  @prop()
  @Field()
  AtoG: string;

  @prop()
  @Field()
  description: string;
}
