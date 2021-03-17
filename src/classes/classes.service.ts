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

  async findOne(query: Partial<Class> = {}) {
    return this.classModel.findById(query);
  }

  async findAll(
    query: Partial<Class> = {},
    args: FindAllArgs = new FindAllArgs(),
  ) {
    return this.classModel.find(query).skip(args.skip).limit(args.take);
  }
}
