import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { UserQuestionService } from './user-question.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('answers')
@UseGuards(JwtAuthGuard)
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

  @Patch(':userId/status/:questionId')
  setStatus(@Param('userId') userId: string, @Param('questionId') questionId: string, @Body() body) {
    return this.answerService.setStatus(userId, questionId, body);
  }

  @Get('game/:userId')
  start(@Param('userId') userId: string) {
    return this.answerService.findNewQuestion(userId);
  }

  @Patch(':userId/set-difficulty/:questionId')
  setDifficulty(
    @Param('userId') userId: string,
    @Param('questionId') questionId: string,
    @Body() payload: number
    ) {
    return this.answerService.setDifficulty(userId, questionId, payload)
  }

  @Get(':questionId/stat')
  getStat(@Param('questionId') questionId: string) {
    return this.answerService.getStat(questionId);
  }
}
