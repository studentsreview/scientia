import { Field, ID, ObjectType } from '@nestjs/graphql';
import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'teachers' } })
@ObjectType()
export class Teacher {
  @Field(() => ID)
  _id: string;

  @prop()
  @Field()
  name: string;

  @prop({ type: [String], default: [] })
  @Field(() => [String])
  departments: [string];

  @prop({ type: [String], default: [] })
  @Field(() => [String])
  semesters: [string];
}
