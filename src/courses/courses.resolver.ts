import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ClassesService } from 'src/classes/classes.service';
import { Class } from 'src/classes/models/class.model';
import { FindAllArgs } from 'src/common/dto/findall.args';
import { CoursesService } from './courses.service';
import { Course } from './models/course.model';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly classesService: ClassesService,
  ) {}

  @Query(() => Course, { nullable: true })
  course(@Args('_id') _id: string) {
    return this.coursesService.findOneById(_id);
  }

  @Query(() => [Course])
  courses(
    @Args()
    args: FindAllArgs = new FindAllArgs(),
  ) {
    return this.coursesService.findAll(args);
  }

  @ResolveField(() => [Class])
  classes(
    @Parent() course: Course,
    @Args() args: FindAllArgs = new FindAllArgs(),
  ) {
    return this.classesService.findAllByName(course.name, args);
  }
}
