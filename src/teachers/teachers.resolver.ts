import {
  Args,
  Float,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ClassesService } from 'src/classes/classes.service';
import { Class } from 'src/classes/models/class.model';
import { GetTeachersArgs } from './dto/teachers.args';
import { TeachersService } from './teachers.service';
import { Teacher } from './models/teacher.model';
import { FilterQuery } from 'mongoose';
import { GetClassesArgs } from 'src/classes/dto/classes.args';
import { ReviewsService } from 'src/reviews/reviews.service';
import { Review } from 'src/reviews/models/review.model';
import { GetReviewsArgs } from 'src/reviews/dto/reviews.args';

@Resolver(() => Teacher)
export class TeachersResolver {
  constructor(
    private readonly teachersService: TeachersService,
    private readonly classesService: ClassesService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @Query(() => Teacher, { nullable: true })
  teacher(
    @Args('_id', { nullable: true }) _id: string,
    @Args('name', { nullable: true }) name: string,
  ) {
    const query = {} as FilterQuery<Teacher>;
    if (_id) query._id = _id;
    if (name) query.name = name;

    return this.teachersService.findOne(query);
  }

  @Query(() => [Teacher])
  teachers(
    @Args()
    args: GetTeachersArgs,
  ) {
    return this.teachersService.findAll({}, args);
  }

  @ResolveField(() => [Class])
  classes(@Parent() teacher: Teacher, @Args() args: GetClassesArgs) {
    return this.classesService.findAll(
      {
        teacher: teacher.name,
      },
      args,
    );
  }

  @ResolveField(() => [Review])
  reviews(@Parent() teacher: Teacher, @Args() args: GetReviewsArgs) {
    return this.reviewsService.findAll({ teacher: teacher.name }, args);
  }

  @ResolveField(() => Float)
  async rating(@Parent() teacher: Teacher) {
    const reviews = await this.reviewsService.findAll(
      {
        teacher: teacher.name,
      },
      {},
    );
    if (reviews.length === 0) return 0;
    return reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length;
  }
}
