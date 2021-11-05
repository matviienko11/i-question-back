import { Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { UserQuestionService } from './user-question.service';

@Controller('user-question')
export class UserQuestionController {
  
  constructor(private answerService: UserQuestionService) {
  }
  
  @Get()
  getAllAnswers() {
    return this.answerService.getAllAnswers();
  }
  
  @Post(':userId/submit/:questionId')
  submitAnswer(@Req() req) {
    return this.answerService.submitAnswer(req);
  }
  
  @Post('game/:userId')
  start(@Param('userId') id: string) {
    return this.answerService.set(id)
  }

  
  @Get(':userId')
  getAnswer(@Param('userId') id: string) {
    return this.answerService.getAnswerByUserId(id);
  }
  
  @Patch(':questionId')
  updateQuestion(@Req() req) {
    return this.answerService.updateQuestionStatus(req);
  }
}
