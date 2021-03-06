import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { databaseProviders } from './providers/database.providers';
import { AuthModule } from './modules/auth/auth.module';
import { IsAuthenticatedMiddleware } from './middleware/isAuthenticated.middleware';
import { AuthController } from './modules/auth/auth.controller';
import { usersProviders } from './providers/users.providers';
import { JwtHelper } from './helpers/jwt.helper';
import { QuestionsController } from './modules/questions/questions.controller';
import { ConfigModule } from '@nestjs/config';
import { UserQuestionModule } from './modules/user-question/user-question.module';

@Module({
  imports: [UsersModule, QuestionsModule, AuthModule, ConfigModule.forRoot(), UserQuestionModule],
  controllers: [AppController],
  providers: [AppService, ...databaseProviders, ...usersProviders, JwtHelper],
  exports: [...databaseProviders],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsAuthenticatedMiddleware)
      .forRoutes();
  }
}