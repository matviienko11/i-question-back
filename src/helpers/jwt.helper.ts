const jwt = require('jsonwebtoken');

export class JwtHelper {
  
  async assignToken(user): Promise<string> {
    return await jwt.sign({ data: user }, 'secret');
  }
}