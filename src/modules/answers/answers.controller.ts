import { Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { AnswersService } from './answers.service';

@Controller('answers')
export class AnswersController {
  
  constructor(private answerService: AnswersService) {
  }
  
  @Get()
  getAllAnswers() {
    return this.answerService.getAllAnswers();
  }
  
  @Post(':userId/submit/:questionId')
  submitAnswer(@Req() req) {
    return this.answerService.submitAnswer(req);
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
