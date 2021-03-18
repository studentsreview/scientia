import { forwardRef, Module } from '@nestjs/common';
import { getModelForClass } from '@typegoose/typegoose';
import { TeachersModule } from 'src/teachers/teachers.module';
import { Review } from './models/review.model';
import { ReviewModel } from './reviews.constants';
import { ReviewsResolver } from './reviews.resolver';
import { ReviewsService } from './reviews.service';

const reviewModelFactory = {
  provide: ReviewModel,
  useFactory: () => {
    return getModelForClass(Review);
  },
};

@Module({
  imports: [forwardRef(() => TeachersModule)],
  providers: [ReviewsResolver, reviewModelFactory, ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
