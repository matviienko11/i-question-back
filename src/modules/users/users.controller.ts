import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }
  
  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }
  
  @Post('register')
  create(@Body() body) {
    return this.usersService.create(body);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.usersService.update(id, body);
  }
  
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
