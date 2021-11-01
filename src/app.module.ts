import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { databaseProviders } from './providers/database.providers';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, QuestionsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, ...databaseProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
