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

  async findOneById(_id: string) {
    return this.courseModel.findById(_id);
  }

  async findOneByName(name: string) {
    return this.courseModel.findOne({
      name,
    });
  }

  async findAll(args: FindAllArgs) {
    return this.courseModel.find().skip(args.skip).limit(args.take);
  }
}
