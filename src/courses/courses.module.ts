import { Module } from '@nestjs/common';
import { getModelForClass } from '@typegoose/typegoose';
import { CoursesResolver } from './courses.resolver';
import { Course } from './models/course.model';
import { CourseModel } from './courses.constants';
import { CoursesService } from './courses.service';

const courseModelFactory = {
  provide: CourseModel,
  useFactory: () => {
    return getModelForClass(Course);
  },
};

@Module({
  providers: [CoursesResolver, courseModelFactory, CoursesService],
})
export class CoursesModule {}
