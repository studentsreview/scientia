import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { FindAllArgs } from 'src/common/dto/findall.args';
import { Teacher } from './models/teacher.model';
import { TeacherModel } from './teachers.constants';

@Injectable()
export class TeachersService {
  constructor(
    @Inject(TeacherModel)
    private readonly courseModel: ReturnModelType<typeof Teacher>,
  ) {}

  async findOne(query: Partial<Teacher> = {}) {
    return this.courseModel.findOne(query);
  }

  async findAll(
    query: Partial<Teacher> = {},
    args: FindAllArgs = new FindAllArgs(),
  ) {
    return this.courseModel.find(query).skip(args.skip).limit(args.take);
  }
}
