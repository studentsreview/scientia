import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { FindAllArgs } from 'src/common/dto/findall.args';
import { CourseModel } from './courses.constants';
import { Course } from './models/course.model';

@Injectable()
export class CoursesService {
  constructor(
    @Inject(CourseModel)
    private readonly courseModel: ReturnModelType<typeof Course>,
  ) {}

  async findOne(query: Partial<Course> = {}) {
    return this.courseModel.findOne(query).populate('classes');
  }

  async findAll(
    query: Partial<Course> = {},
    args: FindAllArgs = new FindAllArgs(),
  ) {
    return this.courseModel
      .find(query)
      .populate('classes')
      .skip(args.skip)
      .limit(args.take);
  }
}
