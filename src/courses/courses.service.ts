import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { CourseModel } from './courses.constants';
import { Course } from './models/course.model';

@Injectable()
export class CoursesService {
  constructor(
    @Inject(CourseModel)
    private readonly courseModel: ReturnModelType<typeof Course>,
  ) {}

  async findOneById(_id: string) {
    return this.courseModel.findById(_id);
  }

  async findAll() {
    return this.courseModel.find();
  }
}
