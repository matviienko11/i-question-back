import { Body, Controller, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
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
}
