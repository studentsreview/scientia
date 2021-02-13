import { Args, Query, Resolver } from '@nestjs/graphql';
import { CoursesService } from './courses.service';
import { Course } from './models/course.model';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @Query(() => Course, { nullable: true })
  course(@Args('_id') _id: string) {
    return this.coursesService.findOneById(_id);
  }

  @Query(() => [Course])
  courses() {
    return this.coursesService.findAll();
  }

  @Query(() => String)
  hello() {
    return 'hello';
  }
}
