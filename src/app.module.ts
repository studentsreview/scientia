import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CoursesModule } from './courses/courses.module';
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    CoursesModule,
  ],
})
export class AppModule {}
