import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ClassesService } from 'src/classes/classes.service';
import { Class } from 'src/classes/models/class.model';
import { FindAllArgs } from 'src/common/dto/findall.args';
import { TeachersService } from './teachers.service';
import { Teacher } from './models/teacher.model';

@Resolver(() => Teacher)
export class TeachersResolver {
  constructor(
    private readonly classesService: ClassesService,
    private readonly teachersService: TeachersService,
  ) {}

  @Query(() => Teacher, { nullable: true })
  teacher(@Args('_id') _id: string) {
    return this.teachersService.findOneById(_id);
  }

  @Query(() => [Teacher])
  teachers(
    @Args()
    args: FindAllArgs = new FindAllArgs(),
  ) {
    return this.teachersService.findAll(args);
  }

  @ResolveField(() => [Class])
  classes(
    @Parent() teacher: Teacher,
    @Args() args: FindAllArgs = new FindAllArgs(),
  ) {
    return this.classesService.findAll(
      {
        teacher: teacher.name,
      },
      args,
    );
  }
}
