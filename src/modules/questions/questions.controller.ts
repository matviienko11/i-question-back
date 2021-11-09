import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

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
  
  @Get('paginated')
  findAllPaginated(
    @Query('page') page = 1,
    @Query('limit') limit = 3) {
    return this.questionsService.findAllPaginated(page, limit);
  }
  
  @Post('new-question')
  create(@Body() body) {
    return this.questionsService.create(body);
  }
  
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body) {
    return this.questionsService.update(id, body);
  }
  
  @Delete(':id')
  delete(@Param() id) {
    return this.questionsService.delete(id);
  }
}
