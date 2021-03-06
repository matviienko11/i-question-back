import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

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
      throw new HttpException(
        'Sorry, but no new questions for you',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.userQuestionRepository.create({
      id: uuid(),
      userId,
      questionId: randomId,
    }).then(() => this.userQuestionRepository.findOne({
      where: { userId, questionId: randomId },
      include: [Question],
    }));
  }

  submitAnswer(req) {
    return this.userQuestionRepository.update({
      answer: req.body.answer,
      status: 'pending',
    }, { where: { userId: req.params.userId, questionId: req.params.questionId } });
  }

  setStatus(userId, questionId, body) {
    console.log(body.status);
    return this.userQuestionRepository.update(
      { status: body.status },
      { where: { userId, questionId } },
    );
  }

  getAllAnswersByUser(userId) {
    return this.userQuestionRepository.findAll({ where: { userId }, include: [Question] });
  }

  getAllPendingQuestionsByUser(userId) {
    return this.userQuestionRepository.findAll({ where: { userId, status: 'pending' }, include: [Question] });
  }

  getAllAnsweredQuestionsByUser(userId) {
    return this.userQuestionRepository.findAll({ where: { userId, status: 'answered' }, include: [Question] });
  }

  setStat(userId, questionId, payload) {
    return this.userQuestionRepository.update(
      {
        difficulty: payload.difficulty,
        rating: payload.rating,
      },
      {
        where: { userId, questionId },
      })
      .then(() => {
        return this.getAverage(questionId)
          .then(({ averageDifficulty, averageRating }) => {
            return this.questionsRepository.update(
              {
                average_difficulty: averageDifficulty,
                average_rating: averageRating,
              },
              { where: { id: questionId } });
          });
      }).then(() => this.userQuestionRepository.findOne({ where: { userId, questionId }, include: [Question] }));
  }

  private getAverage(questionId) {
    return this.userQuestionRepository.findAll(
      { where: { questionId } })
      .then(data => {
        const averageDifficulty = data
          .map(question => question.difficulty)
          .filter(i => !!i)
          .reduce((a, b, _, arr) => a + b / arr.length, 0);
        const averageRating = data
          .map(question => question.rating)
          .filter(i => !!i)
          .reduce((a, b, _, arr) => a + b / arr.length, 0);
        return { averageDifficulty, averageRating };
      });
  }

  private async handleRandomIdSelection(userId) {
    const allQuestionsIds = await this.questionsRepository.findAll().then(questions => questions.map(q => q.id));
    const questionIdsFromTable = await this.userQuestionRepository.findAll({ where: { userId } }).then(data => data.map(i => i.questionId));
    const arrToChooseIdFrom = allQuestionsIds.filter((i: string) => !questionIdsFromTable.includes(i));
    if (!arrToChooseIdFrom.length) return null;
    return arrToChooseIdFrom[Math.floor(Math.random() * arrToChooseIdFrom.length)];
  }
}
