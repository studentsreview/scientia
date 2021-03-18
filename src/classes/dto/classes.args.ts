import { ArgsType, Field } from '@nestjs/graphql';
import { FindAllArgs } from 'src/common/dto/findall.args';

@ArgsType()
export class GetClassesArgs extends FindAllArgs {
  @Field(() => String, { nullable: true })
  semester: string;

  @Field(() => String, { nullable: true })
  block: string;

  @Field(() => String, { nullable: true })
  teacher: string;
}
