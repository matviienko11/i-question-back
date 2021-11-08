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
    });
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
  
  private async handleRandomIdSelection(userId) {
    const allQuestionsIds = await this.questionsRepository.findAll().then(questions => questions.map(q => q.id));
    const questionIdsFromTable = await this.userQuestionRepository.findAll({ where: { userId } }).then(data => data.map(i => i.questionId));
    const arrToChooseIdFrom = allQuestionsIds.filter((i: string) => !questionIdsFromTable.includes(i));
    if (!arrToChooseIdFrom.length) return null;
    return arrToChooseIdFrom[Math.floor(Math.random() * arrToChooseIdFrom.length)];
  }
}
