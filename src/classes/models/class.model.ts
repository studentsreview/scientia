import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Teacher } from 'src/teachers/models/teacher.model';

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

  // TODO: make ref
  @prop({ ref: Teacher, foreignField: 'name', localField: 'teacher' })
  @Field(() => Teacher)
  teacher: Ref<Teacher>;

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
