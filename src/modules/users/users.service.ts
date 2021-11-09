import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { User } from './user.entity';
import { HashHelper } from '../../helpers/hash.helper';

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
  
  async create(body) {
    return this.usersRepository.create({
      id: uuid(),
      first_name: body.first_name,
      last_name: body.last_name,
      phone: body.phone,
      email: body.email,
      password: await this.hashHelper.hashedPassword(body.password),
      role: body.role
    });
  }
  
  async update(id: string, body) {
    return this.usersRepository.update(
      {
        first_name: body.first_name,
        last_name: body.last_name,
        phone: body.phone,
        email: body.email
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
