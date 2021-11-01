import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { of } from 'rxjs';

@Injectable()
export class UsersService {
  constructor( @Inject('USERS_REPOSITORY') private usersRepository: typeof User) {
  }
  
  async findAll(){
    return this.usersRepository.findAll<User>();
  }
}
