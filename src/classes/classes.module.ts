import { forwardRef, Module } from '@nestjs/common';
import { getModelForClass } from '@typegoose/typegoose';
import { Class } from './models/class.model';
import { ClassModel } from './classes.constants';
import { ClassesService } from './classes.service';
import { CoursesModule } from 'src/courses/courses.module';
import { ClassesResolver } from 'src/classes/classes.resolver';

const classModelFactory = {
  provide: ClassModel,
  useFactory: () => {
    return getModelForClass(Class);
  },
};

@Module({
  imports: [forwardRef(() => CoursesModule)],
  providers: [ClassesResolver, classModelFactory, ClassesService],
  exports: [ClassesService],
})
export class ClassesModule {}
