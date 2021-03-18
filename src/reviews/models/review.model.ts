import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'reviews' } })
@ObjectType()
export class Review {
  @Field(() => ID)
  _id: string;

  @prop()
  teacher: string;

  @prop()
  @Field()
  text: string;

  @prop()
  @Field()
  timestamp: string;

  @prop()
  @Field(() => Int)
  rating: number;

  @prop()
  @Field(() => Int)
  version: number;
}
