import { NextFunction, Response } from 'express';
import { Inject, NestMiddleware } from '@nestjs/common';
import { JwtHelper } from '../helpers/jwt.helper';
import { User } from '../modules/users/user.entity';

export class IsAuthenticatedMiddleware implements NestMiddleware {
  constructor(@Inject('USERS_REPOSITORY') private usersRepository: typeof User,
              private jwtHelper: JwtHelper) {
  }


  async use(req: any, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    if (!token) {
      res.statusCode = 401;
      res.json({ message: 'No token provided' });
    }
    const { data: parsedToken } = await this.jwtHelper.verifyToken(token);
    const user = await this.usersRepository.findOne({ where: { id: parsedToken.id } })
    if (!user) {
      res.statusCode = 400;
      res.json({ message: 'Your token is corrupted' });
    } else {
      req.user = user;
      next();
    }
  }
}
