import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TeachersService } from 'src/teachers/teachers.service';
import { GetReviewsArgs } from './dto/reviews.args';
import { ReviewsService } from './reviews.service';
import { Review } from './models/review.model';
import { Teacher } from 'src/teachers/models/teacher.model';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly teachersService: TeachersService,
  ) {}

  @Query(() => Review, { nullable: true })
  review(@Args('_id', { nullable: true }) _id: string) {
    return this.reviewsService.findOne({ _id });
  }

  @Query(() => [Review])
  reviews(
    @Args()
    args: GetReviewsArgs,
  ) {
    return this.reviewsService.findAll({}, args);
  }

  @ResolveField(() => Teacher)
  teacher(@Parent() review: Review) {
    return this.teachersService.findOne({ name: review.teacher });
  }
}
