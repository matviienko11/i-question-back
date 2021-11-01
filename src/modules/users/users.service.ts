import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';

const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof User) {
  }
  
  async findAll() {
    return this.usersRepository.findAll<User>();
  }
  
  async findOne(id) {
    return this.usersRepository.findOne({ where: { id } });
  }
  
  async create(req) {
    
    const hash = await bcrypt.hash(req.body.password, 10);
    return this.usersRepository.create({
      id: uuid(),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      email: req.body.email,
      password: hash,
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
