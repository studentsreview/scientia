import { ArgsType, Field, Int } from '@nestjs/graphql';
import { FindAllArgs } from 'src/common/dto/findall.args';

@ArgsType()
export class GetReviewsArgs extends FindAllArgs {
  @Field(() => String, { nullable: true })
  teacher?: string;

  @Field(() => Int, { nullable: true })
  version?: number;
}
