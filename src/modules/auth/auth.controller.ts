import { Body, Controller, Post, Req } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }
  
  @Post('login')
  login(@Req() req) {
    return this.authService.login(req);
  }
  
  @Post('user-info')
  getUserInfo(@Body() body) {
    return this.authService.getUserInfo(body);
  }
}
