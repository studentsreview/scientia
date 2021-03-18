import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { FilterQuery } from 'mongoose';
import { CourseModel } from './courses.constants';
import { GetCoursesArgs } from './dto/courses.args';
import { Course } from './models/course.model';

@Injectable()
export class CoursesService {
  constructor(
    @Inject(CourseModel)
    private readonly courseModel: ReturnModelType<typeof Course>,
  ) {}

  async findOne(query: FilterQuery<Course> = {}) {
    return this.courseModel.findOne(query);
  }

  async findAll(
    query: FilterQuery<Course> = {},
    args: GetCoursesArgs = new GetCoursesArgs(),
  ) {
    if (args.department) query.department = args.department;
    if (args.AtoG) query.AtoG = args.AtoG;
    return this.courseModel.find(query).skip(args.skip).limit(args.take);
  }
}
