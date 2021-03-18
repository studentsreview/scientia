import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { FilterQuery } from 'mongoose';
import { ClassModel } from './classes.constants';
import { GetClassesArgs } from './dto/classes.args';
import { Class } from './models/class.model';

@Injectable()
export class ClassesService {
  constructor(
    @Inject(ClassModel)
    private readonly classModel: ReturnModelType<typeof Class>,
  ) {}

  async findOne(query: FilterQuery<Class> = {}) {
    return this.classModel.findById(query);
  }

  async findAll(
    query: FilterQuery<Class> = {},
    args: GetClassesArgs = new GetClassesArgs(),
  ) {
    if (args.block) query.block = args.block;
    if (args.teacher) query.teacher = args.teacher;
    if (args.semester) query.semester = args.semester;
    return this.classModel.find(query).skip(args.skip).limit(args.take);
  }
}
