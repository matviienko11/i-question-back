import { Inject, Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof User) {
  }
  
  async findAllUsers() {
    return this.usersRepository.findAll<User>({ where: { role: 'user' } });
  }
  
  async findOne(id) {
    return this.usersRepository.findOne({ where: { id } });
  }
  
  async update(id: string, payload: Partial<UpdateUserDto>) {
    return this.usersRepository.update(
      {
        profile_image: payload.profile_image,
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
