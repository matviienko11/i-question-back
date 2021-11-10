import { Inject, Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { HashHelper } from '../../helpers/hash.helper';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof User, private hashHelper: HashHelper) {
  }
  
  async findAllUsers() {
    return this.usersRepository.findAll<User>({ where: { role: 'user' } });
  }
  
  async findOne(id) {
    return this.usersRepository.findOne({ where: { id } });
  }
  
  async update(id: string, payload: UpdateUserDto) {
    return this.usersRepository.update(
      {
        first_name: payload.first_name,
        last_name: payload.last_name,
        phone: payload.phone,
        email: payload.email
      },
      {
        where: { id }
      })
      .then(() => this.findOne(id));
  }
  
  async delete(id) {
    return this.usersRepository.destroy(
      { where: { id } }
    )
      .then(() => this.findAllUsers());
  }
}
