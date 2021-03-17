import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { FindAllArgs } from 'src/common/dto/findall.args';
import { ClassModel } from './classes.constants';
import { Class } from './models/class.model';

@Injectable()
export class ClassesService {
  constructor(
    @Inject(ClassModel)
    private readonly classModel: ReturnModelType<typeof Class>,
  ) {}

  async findOneById(_id: string) {
    return this.classModel.findById(_id);
  }

  async findAll(args: FindAllArgs) {
    return this.classModel.find().skip(args.skip).limit(args.take);
  }

  async findAllByName(name: string, args: FindAllArgs) {
    return this.classModel
      .find({
        name,
      })
      .skip(args.skip)
      .limit(args.take);
  }
}
