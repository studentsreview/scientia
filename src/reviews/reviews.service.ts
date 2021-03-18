import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { FilterQuery } from 'mongoose';
import { GetReviewsArgs } from './dto/reviews.args';
import { Review } from './models/review.model';
import { ReviewModel } from './reviews.constants';
import { SortType } from 'src/common/enums/sort-type';

@Injectable()
export class ReviewsService {
  constructor(
    @Inject(ReviewModel)
    private readonly reviewModel: ReturnModelType<typeof Review>,
  ) {}

  async findOne(query: FilterQuery<Review> = {}) {
    return this.reviewModel.findOne(query);
  }

  async findAll(
    query: FilterQuery<Review> = {},
    args: GetReviewsArgs = new GetReviewsArgs(),
  ) {
    if (args.teacher) query.teacher = args.teacher;
    if (args.version) query.rating = args.version;
    return this.reviewModel
      .find(query)
      .sort({
        timestamp: args.timestampSort === SortType.ASC ? 1 : -1,
      })
      .skip(args.skip)
      .limit(args.take);
  }
}
