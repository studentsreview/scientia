import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ClassesService } from './classes.service';
import { Class } from './models/class.model';
import { FindAllArgs } from 'src/common/dto/findall.args';
import { CoursesService } from 'src/courses/courses.service';
import { Course } from 'src/courses/models/course.model';

@Resolver(() => Class)
export class ClassesResolver {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly classesService: ClassesService,
  ) {}

  @Query(() => Class, { nullable: true })
  class(@Args('_id') _id: string) {
    return this.classesService.findOneById(_id);
  }

  @Query(() => [Class])
  classes(
    @Args()
    args: FindAllArgs = new FindAllArgs(),
  ) {
    return this.classesService.findAll(args);
  }

  @ResolveField(() => Course)
  course(@Parent() class_: Class) {
    return this.coursesService.findOneByName(class_.name);
  }
}
