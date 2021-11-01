import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { usersProviders } from '../../providers/users.providers';
import { HashHelper } from '../../helpers/hash.helper';
import { JwtHelper } from '../../helpers/jwt.helper';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    HashHelper,
    JwtHelper,
    ...usersProviders
  ]
})
export class AuthModule {}
