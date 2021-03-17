import { forwardRef, Module } from '@nestjs/common';
import { getModelForClass } from '@typegoose/typegoose';
import { CoursesResolver } from './courses.resolver';
import { Course } from './models/course.model';
import { CourseModel } from './courses.constants';
import { CoursesService } from './courses.service';
import { ClassesModule } from 'src/classes/classes.module';

const courseModelFactory = {
  provide: CourseModel,
  useFactory: () => {
    return getModelForClass(Course);
  },
};

@Module({
  imports: [forwardRef(() => ClassesModule)],
  providers: [CoursesResolver, courseModelFactory, CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
