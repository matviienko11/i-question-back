import { Inject, Injectable } from '@nestjs/common';

import { Question } from './question.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class QuestionsService {
  constructor(@Inject('QUESTIONS_REPOSITORY') private questionsRepository: typeof Question) {
  }
  
  async findAll() {
    return this.questionsRepository.findAll<Question>();
  }
  
  async findOne(id) {
    return this.questionsRepository.findOne({ where: { id } });
  }
  
  async create(req) {
    return this.questionsRepository.create({
      id: uuid(),
      question: req.body.question,
    });
  }
  
  async update(req) {
    return this.questionsRepository.update(
      {
        question: req.body.question,
      },
      {
        where: { id: req.params.id }
      })
      .then(() => this.findOne(req.params.id));
  }
  
  async delete(req) {
    return this.questionsRepository.destroy(
      { where: { id: req.params.id } }
    )
      .then(() => this.findAll());
  }
}
