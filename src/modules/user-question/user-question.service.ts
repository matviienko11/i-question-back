import { Inject, Injectable } from '@nestjs/common';
import { UserQuestion } from './user-question.entity';
import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserQuestionService {
  
  constructor(@Inject('USERS_QUESTIONS_REPOSITORY') private userQuestionRepository: typeof UserQuestion,
              @Inject('QUESTIONS_REPOSITORY') private questionsRepository: typeof Question) {
  }
  
  submitAnswer(req) {
    return this.userQuestionRepository.create({
      id: uuid(),
      userId: req.params.userId,
      questionId: req.params.questionId,
      answer: req.body.answer
    }, { include: [Question, User] });
  }
  
  getAllAnswers() {
    return this.userQuestionRepository.findAll({ include: [Question, User] });
  }
  
  async set(userId) {
    // const questionIdsFromTable = await this.userQuestionRepository.findAll({ where: { userId } }).then(data => data.map(i => i.questionId))
    // const questionIdsFromPool = await this.questionsRepository.findAll().then(questions => questions.map(q => q.id));
    // const randomId = this.randomQuestionIdFinder(questionIdsFromPool);
    // const isInTable = questionIdsFromTable.includes(randomId);
    const { isInTable, randomId } = await this.randomShit(userId)
    if (!isInTable) {
      return this.userQuestionRepository.create({
        id: uuid(),
        userId,
        questionId: randomId,
      })
    } else {
      return 'Suck my dick';
    }

  }
  
  private async randomShit(userId) {
    const questionIdsFromTable = await this.userQuestionRepository.findAll({ where: { userId } }).then(data => data.map(i => i.questionId))
    const questionIdsFromPool = await this.questionsRepository.findAll().then(questions => questions.map(q => q.id));
    const randomId = questionIdsFromPool[Math.floor(Math.random() * questionIdsFromPool.length)];
    const isInTable = questionIdsFromTable.includes(randomId);
    return { isInTable, randomId }
  }
  
  getAnswerByUserId(userId) {
    return this.userQuestionRepository.findOne({ include: [Question, User], where: { userId } });
  }
  
  getAnswerByQuestionId(questionId) {
    return this.userQuestionRepository.findOne({ include: [Question, User], where: { questionId } });
  }
  
  updateQuestionStatus(req) {
    return this.userQuestionRepository.update(
      { status: 'answered' },
      { where: { questionId: req.params.questionId } }
    )
      .then(() => this.getAnswerByQuestionId(req.params.questionId));
  }
}
