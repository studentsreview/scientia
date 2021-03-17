import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'classes' } })
@ObjectType()
export class Class {
  @Field(() => ID)
  _id: string;

  @prop()
  @Field()
  name: string;

  @prop()
  @Field()
  code: string;

  @prop()
  @Field()
  block: string;

  @prop()
  @Field()
  room: string;

  @prop()
  teacher: string;

  @prop()
  @Field()
  semester: string;

  @prop()
  @Field({ nullable: true })
  section: string;

  @prop({ type: [Number] })
  @Field(() => [Int], { nullable: true })
  seats: number[];
}
