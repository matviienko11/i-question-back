import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from '../../providers/users.providers';
import { HashHelper } from '../../helpers/hash.helper';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    HashHelper,
    ...usersProviders
  ]
})
export class UsersModule {}
