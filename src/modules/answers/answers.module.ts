import { Module } from '@nestjs/common';
import { answersProviders } from '../../providers/answers.providers';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';

@Module({
  providers: [
    ...answersProviders,
    AnswersService
  ],
  controllers: [AnswersController]
})
export class AnswersModule {}
