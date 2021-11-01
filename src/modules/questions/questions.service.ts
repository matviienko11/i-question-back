import { Inject, Injectable } from '@nestjs/common';
import { Question } from './question.entity';

@Injectable()
export class QuestionsService {
  constructor(@Inject('QUESTIONS_REPOSITORY') private questionsRepository: typeof Question) {
  }
  
  async findAll() {
    return this.questionsRepository.findAll<Question>();
  }
}
