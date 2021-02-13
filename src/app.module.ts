import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { mongoose } from '@typegoose/typegoose';
import { CoursesModule } from './courses/courses.module';

const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: async () => {
    const connection = await mongoose.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'StudentsReview',
    });
    return connection;
  },
};
@Module({
  providers: [connectionFactory],
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    CoursesModule,
  ],
})
export class AppModule {}
