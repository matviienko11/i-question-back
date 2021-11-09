import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { QuestionsService } from './questions.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {
  }
  
  @Get()
  findAll() {
    return this.questionsService.findAll();
  }
  
  @Post('new-question')
  create(@Body() body) {
    return this.questionsService.create(body);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.questionsService.update(id, body);
  }
  
  @Delete(':id')
  delete(@Param() id) {
    return this.questionsService.delete(id);
  }
}
