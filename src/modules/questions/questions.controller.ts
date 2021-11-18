import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { QuestionsService } from './questions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { ROLES } from '../../shared/constants/roles.enum';

@ApiTags('questions')
@UseGuards(JwtAuthGuard, RolesGuard)
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
    @Query('limit') limit = 3,
    @Query('search') search: string
  ) {
    return this.questionsService.findAllPaginated(page, limit, search);
  }
  
  @Post('new-question')
  @Roles(ROLES.MANAGER)
  create(@Body() body) {
    return this.questionsService.create(body);
  }
  
  @Patch(':id')
  @Roles(ROLES.MANAGER)
  update(
    @Param('id') id: string,
    @Body() body) {
    return this.questionsService.update(id, body);
  }
  
  @Delete(':id')
  @Roles(ROLES.MANAGER)
  delete(@Param('id') id) {
    return this.questionsService.delete(id);
  }
}
