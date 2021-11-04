import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { User } from './user.entity';
import { HashHelper } from '../../helpers/hash.helper';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof User, private hashHelper: HashHelper) {
  }
  
  async findAll() {
    return this.usersRepository.findAll<User>();
  }
  
  async findOne(id) {
    return this.usersRepository.findOne({ where: { id } });
  }
  
  async create(req) {
    return this.usersRepository.create({
      id: uuid(),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      email: req.body.email,
      password: await this.hashHelper.hashedPassword(req.body.password),
    });
  }
  
  async update(req) {
    return this.usersRepository.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email
      },
      {
        where: { id: req.params.id }
      })
      .then(() => this.findOne(req.params.id));
  }
  
  async delete(req) {
    return this.usersRepository.destroy(
      { where: { id: req.params.id } }
    )
      .then(() => this.findAll());
  }
}
