import { Controller, Post, Req } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }
  
  @Post('login')
  login(@Req() req) {
    return this.authService.login(req);
  }
}
