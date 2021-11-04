import { Inject, Injectable } from '@nestjs/common';
import { UserQuestion } from './answer.entity';
import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AnswersService {
  
  constructor(@Inject('ANSWERS_REPOSITORY') private userQuestionRepository: typeof UserQuestion) {
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
