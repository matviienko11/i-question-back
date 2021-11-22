import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Req, Res,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { of } from 'rxjs';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { ROLES } from '../../shared/constants/roles.enum';
import { User } from './user.entity';
import { STORAGE } from '../../helpers/file-storage-config.helper';

const path = require('path');

@ApiTags('users')
//TODO: Removed guards temporary. Some problems with proxing requests. Will uncomment as soon as possible
// @UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }
  
  @Get()
  @Roles(ROLES.MANAGER)
  findAll() {
    return this.usersService.findAllUsers();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }
  
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', STORAGE))
  uploadFile(@UploadedFile() file, @Req() req) {
    const user: User = req.user;
    return this.usersService.update(user.id, { profile_image: file.filename })
  }
  
  @Get('profile-image/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res){
    return of(res.sendFile(path.join(process.cwd(), 'uploads/profileimages/' + imagename)));
  }
}
