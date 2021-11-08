import { Controller, Delete, Get, Patch, Post, Req } from '@nestjs/common';

import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }
  
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  
  @Get(':id')
  findOne(@Req() req) {
    return this.usersService.findOne(req.params.id)
  }
  
  @Post('register')
  create(@Req() req) {
    return this.usersService.create(req);
  }
  
  @Patch(':id')
  update(@Req() req) {
    return this.usersService.update(req);
  }
  
  @Delete(':id')
  delete(@Req() req) {
    return this.usersService.delete(req);
  }
}
