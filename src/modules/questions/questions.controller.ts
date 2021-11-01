import { Controller, Delete, Get, Patch, Post, Req } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {
  }
  
  @Get()
  findAll() {
    return this.questionsService.findAll();
  }
  
  @Post('new-question')
  create(@Req() req) {
    return this.questionsService.create(req);
  }
  
  @Patch(':id')
  update(@Req() req) {
    return this.questionsService.update(req);
  }
  
  @Delete(':id')
  delete(@Req() req) {
    return this.questionsService.delete(req);
  }
}
