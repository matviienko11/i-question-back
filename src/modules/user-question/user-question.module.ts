import { Module } from '@nestjs/common';
import { userQuestionProviders } from '../../providers/user-question.providers';
import { UserQuestionService } from './user-question.service';
import { UserQuestionController } from './user-question.controller';
import { questionsProviders } from '../../providers/questions.providers';

@Module({
  providers: [
    ...userQuestionProviders,
    ...questionsProviders,
    UserQuestionService
  ],
  controllers: [UserQuestionController]
})
export class UserQuestionModule {}
