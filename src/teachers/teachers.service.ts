import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { FilterQuery } from 'mongoose';
import { GetTeachersArgs } from './dto/teachers.args';
import { Teacher } from './models/teacher.model';
import { TeacherModel } from './teachers.constants';

@Injectable()
export class TeachersService {
  constructor(
    @Inject(TeacherModel)
    private readonly courseModel: ReturnModelType<typeof Teacher>,
  ) {}

  async findOne(query: FilterQuery<Teacher> = {}) {
    return this.courseModel.findOne(query);
  }

  async findAll(
    query: FilterQuery<Teacher> = {},
    args: GetTeachersArgs = new GetTeachersArgs(),
  ) {
    if (args.department) {
      query.departments = {
        $elemMatch: { $eq: args.department },
      };
    }
    if (args.semester) {
      query.semesters = {
        $elemMatch: { $eq: args.semester },
      };
    }
    return this.courseModel.find(query).skip(args.skip).limit(args.take);
  }
}
