import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { usersProviders } from '../../providers/users.providers';
import { HashHelper } from '../../helpers/hash.helper';
import { JwtHelper } from '../../helpers/jwt.helper';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    HashHelper,
    JwtHelper,
    JwtStrategy,
    ...usersProviders
  ]
})
export class AuthModule {
}
