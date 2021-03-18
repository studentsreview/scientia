import { forwardRef, Module } from '@nestjs/common';
import { getModelForClass } from '@typegoose/typegoose';
import { ClassesModule } from 'src/classes/classes.module';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { Teacher } from './models/teacher.model';
import { TeacherModel } from './teachers.constants';
import { TeachersResolver } from './teachers.resolver';
import { TeachersService } from './teachers.service';

const teacherModelFactory = {
  provide: TeacherModel,
  useFactory: () => {
    return getModelForClass(Teacher);
  },
};

@Module({
  imports: [forwardRef(() => ClassesModule), forwardRef(() => ReviewsModule)],
  providers: [TeachersResolver, teacherModelFactory, TeachersService],
  exports: [TeachersService],
})
export class TeachersModule {}
