import { Inject, Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { HashHelper } from '../../helpers/hash.helper';
import { JwtHelper } from '../../helpers/jwt.helper';

@Injectable()
export class AuthService {
  constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof User,
              private hashHelper: HashHelper,
              private jwtHelper: JwtHelper) {
  }
  
  async login(req) {
    const user = await this.usersRepository.findOne({ where: { email: req.body.email }});
    if(user) {
      const isEqual = await this.hashHelper.compareHashes(req.body.password, user.password)
      if (isEqual) {
        return await this.jwtHelper.assignToken(user);
      }
    }
  }
}
