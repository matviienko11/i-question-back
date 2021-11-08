import { Inject, Injectable } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

import { UserQuestion } from './user-question.entity';
import { Question } from '../questions/question.entity';

@Injectable()
export class UserQuestionService {
  
  constructor(@Inject('USERS_QUESTIONS_REPOSITORY') private userQuestionRepository: typeof UserQuestion,
              @Inject('QUESTIONS_REPOSITORY') private questionsRepository: typeof Question) {
  }
  
  async findNewQuestion(userId) {
    const randomId = await this.handleRandomIdSelection(userId);
    if (!randomId) {
      return {
        message: 'Sorry, but no new questions for you'
      };
    }
    return this.userQuestionRepository.create({
      id: uuid(),
      userId,
      questionId: randomId
    }).then(() => this.userQuestionRepository.findOne({
      where: { userId, questionId: randomId },
      include: [Question]
    }));
  }
  
  submitAnswer(req) {
    return this.userQuestionRepository.update({
      answer: req.body.answer,
      status: 'pending'
    }, { where: { userId: req.params.userId, questionId: req.params.questionId } });
  }
  
  setAnsweredStatus(userId, questionId, body) {
    return this.userQuestionRepository.update(
      { status: body.status },
      { where: { userId, questionId } }
    );
  }
  
  getAllAnswersByUser(userId) {
    return this.userQuestionRepository.findAll({ where: { userId } });
  }
  
  getAllPendingQuestionsByUser(userId) {
    return this.userQuestionRepository.findAll({ where: { userId, status: 'pending' }, include: [Question] });
  }
  
  getAllAnsweredQuestionsByUser(userId) {
    return this.userQuestionRepository.findAll({ where: { userId, status: 'answered' }, include: [Question] });
  }
  
  private async handleRandomIdSelection(userId) {
    const allQuestionsIds = await this.questionsRepository.findAll().then(questions => questions.map(q => q.id));
    const questionIdsFromTable = await this.userQuestionRepository.findAll({ where: { userId } }).then(data => data.map(i => i.questionId));
    const arrToChooseIdFrom = allQuestionsIds.filter((i: string) => !questionIdsFromTable.includes(i));
    if (!arrToChooseIdFrom.length) return null;
    return arrToChooseIdFrom[Math.floor(Math.random() * arrToChooseIdFrom.length)];
  }
}
