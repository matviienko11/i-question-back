import { Injectable } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }
  
  async validate(payload: any) {
    return { user: payload.data };
  }
}