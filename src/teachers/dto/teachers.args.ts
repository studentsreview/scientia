import { ArgsType, Field } from '@nestjs/graphql';
import { FindAllArgs } from 'src/common/dto/findall.args';

@ArgsType()
export class GetTeachersArgs extends FindAllArgs {
  @Field(() => String, { nullable: true })
  department?: string;

  @Field(() => String, { nullable: true })
  semester?: string;
}
