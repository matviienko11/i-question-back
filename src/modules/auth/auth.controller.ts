import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }
  
  @Post('register')
  create(@Body() user: RegisterUserDto) {
    return this.authService.register(user);
  }
  
  @Post('login')
  login(@Body() user: LoginUserDto) {
    return this.authService.login(user);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('user-info')
  getUserInfo(@Body() body) {
    return this.authService.getUserInfo(body);
  }
}
