import { Inject, Injectable } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

import { User } from '../users/user.entity';
import { HashHelper } from '../../helpers/hash.helper';
import { JwtHelper } from '../../helpers/jwt.helper';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof User,
              private hashHelper: HashHelper,
              private jwtHelper: JwtHelper) {
  }
  
  async register(user: RegisterUserDto) {
    return this.usersRepository.create({
      id: uuid(),
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      email: user.email,
      password: await this.hashHelper.hashedPassword(user.password),
      role: user.role
    });
  }
  
  async login(payload: LoginUserDto) {
    const user = await this.usersRepository.findOne({ where: { email: payload.email } });
    if (user) {
      const isEqual = await this.hashHelper.compareHashes(payload.password, user.password);
      if (!isEqual) return { message: 'Wrong password' };
      return await this.jwtHelper.assignToken(user);
    } else {
      return { message: 'Wrong email' };
    }
  }
  
  async getUserInfo(body) {
    const user = await this.usersRepository.findOne({ where: { email: body.email } });
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    };
  }
}
