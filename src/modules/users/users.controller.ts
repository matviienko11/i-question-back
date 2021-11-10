import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
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
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.usersService.update(id, body);
  }
  
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
