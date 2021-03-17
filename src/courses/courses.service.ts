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

  async findOneById(_id: string) {
    return this.courseModel.findById(_id);
  }

  async findOneByName(name: string) {
    return this.courseModel.findOne({
      name,
    });
  }

  async findAll(
    query: Partial<Course> = {},
    args: FindAllArgs = new FindAllArgs(),
  ) {
    return this.courseModel.find(query).skip(args.skip).limit(args.take);
  }
}
