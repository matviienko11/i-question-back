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
  
  async findAllPaginated(currentPage, limit) {
    const { count, rows: data } = await this.questionsRepository.findAndCountAll({
      offset: (currentPage - 1) * limit,
      limit: Number(limit),
      order: [['createdAt', 'DESC']]
    });
    const totalPages = Math.ceil(count / limit);
    return {
      count,
      data,
      page: Number(currentPage),
      totalPages,
    };
  }
  
  async findOne(id) {
    return this.questionsRepository.findOne({ where: { id } });
  }
  
  async create(body) {
    return this.questionsRepository.create({
      id: uuid(),
      question: body.question,
      category: body.category
    });
  }
  
  async update(id: string, body: any) {
    return this.questionsRepository.update(
      {
        question: body.question
      },
      {
        where: { id }
      })
      .then(() => this.findOne(id));
  }
  
  async delete(id: string) {
    return this.questionsRepository.destroy(
      { where: { id } }
    );
    // .then(() => this.findAll());
  }
}
