import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ClassesService } from './classes.service';
import { Class } from './models/class.model';
import { CoursesService } from 'src/courses/courses.service';
import { Teacher } from 'src/teachers/models/teacher.model';
import { TeachersService } from 'src/teachers/teachers.service';
import { Course } from 'src/courses/models/course.model';
import { GetClassesArgs } from './dto/classes.args';

@Resolver(() => Class)
export class ClassesResolver {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly classesService: ClassesService,
    private readonly teachersService: TeachersService,
  ) {}

  @Query(() => Class, { nullable: true })
  class(@Args('_id', { nullable: true }) _id: string) {
    return this.classesService.findOne({ _id });
  }

  @Query(() => [Class])
  classes(
    @Args()
    args: GetClassesArgs,
  ) {
    return this.classesService.findAll({}, args);
  }

  @ResolveField(() => Course)
  course(@Parent() class_: Class) {
    return this.coursesService.findOne({
      name: class_.name,
    });
  }

  @ResolveField(() => Teacher)
  teacher(@Parent() class_: Class) {
    return this.teachersService.findOne({
      name: class_.teacher,
    });
  }
}
