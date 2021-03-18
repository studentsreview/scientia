import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { FilterQuery } from 'mongoose';
import { ClassesService } from 'src/classes/classes.service';
import { GetClassesArgs } from 'src/classes/dto/classes.args';
import { Class } from 'src/classes/models/class.model';
import { CoursesService } from './courses.service';
import { GetCoursesArgs } from './dto/courses.args';
import { Course } from './models/course.model';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly classesService: ClassesService,
  ) {}

  @Query(() => Course, { nullable: true })
  course(
    @Args('_id', { nullable: true }) _id: string,
    @Args('name', { nullable: true }) name: string,
  ) {
    const query = {} as FilterQuery<Course>;
    if (_id) query._id = _id;
    if (name) query.name = name;

    return this.coursesService.findOne(query);
  }

  @Query(() => [Course])
  courses(
    @Args()
    args: GetCoursesArgs,
  ) {
    const query = {} as FilterQuery<Course>;
    if (args.department) query.department = args.department;
    if (args.AtoG) query.AtoG = args.AtoG;

    return this.coursesService.findAll(query, args);
  }

  @ResolveField(() => [Class])
  classes(@Parent() course: Course, @Args() args: GetClassesArgs) {
    return this.classesService.findAll({ name: course.name }, args);
  }
}
