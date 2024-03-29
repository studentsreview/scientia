import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { mongoose } from '@typegoose/typegoose';
import { ClassesModule } from './classes/classes.module';
import { CoursesModule } from './courses/courses.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TeachersModule } from './teachers/teachers.module';

const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: async () => {
    const connection = await mongoose.connect('mongodb://0.0.0.0:27017', {
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
    ClassesModule,
    TeachersModule,
    ReviewsModule,
  ],
})
export class AppModule {}
