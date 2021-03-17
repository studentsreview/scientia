import { Module } from '@nestjs/common';
import { getModelForClass } from '@typegoose/typegoose';
import { ClassesService } from 'src/classes/classes.service';
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
  imports: [ClassesService],
  providers: [TeachersResolver, teacherModelFactory, TeachersService],
  exports: [TeachersService],
})
export class TeachersModule {}
