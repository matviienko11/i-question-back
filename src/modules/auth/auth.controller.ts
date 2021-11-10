import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }
  
  @Post('login')
  login(@Body() body) {
    return this.authService.login(body);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('user-info')
  getUserInfo(@Body() body) {
    return this.authService.getUserInfo(body);
  }
}
