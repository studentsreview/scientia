import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class CoursesResolver {
  @Query(() => String)
  hello() {
    return 'hello';
  }
}
