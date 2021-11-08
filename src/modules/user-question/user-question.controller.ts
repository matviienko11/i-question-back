import { Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';

import { UserQuestionService } from './user-question.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('answers')
@Controller('user-question')
export class UserQuestionController {
  
  constructor(private answerService: UserQuestionService) {
  }
  
  @Get('all-answers/:userId')
  getAll(@Param('userId') userId: string) {
    return this.answerService.getAllAnswersByUser(userId);
  }
  
  @Get('all-answers/:userId/pending')
  getAllPending(@Param('userId') userId: string) {
    return this.answerService.getAllPendingQuestionsByUser(userId);
  }
  
  @Get('all-answers/:userId/answered')
  getAllAnswered(@Param('userId') userId: string) {
    return this.answerService.getAllAnsweredQuestionsByUser(userId);
  }
  
  @Patch(':userId/pending/:questionId')
  submitAnswer(@Req() req) {
    return this.answerService.submitAnswer(req);
  }
  
  @Patch(':userId/answered/:questionId/')
  setAnswered(@Param('userId') userId: string, @Param('questionId') questionId: string) {
    return this.answerService.setAnsweredStatus(userId, questionId);
  }
  
  @Post('game/:userId/')
  start(@Param('userId') userId: string) {
    return this.answerService.findNewQuestion(userId);
  }
}
