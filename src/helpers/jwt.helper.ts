const jwt = require('jsonwebtoken');

export class JwtHelper {
  
  async assignToken(user): Promise<string> {
    return await jwt.sign({ data: user }, process.env.JWT_SECRET);
  }
  
  async verifyToken(token) {
    return await jwt.verify(token, process.env.JWT_SECRET);
  }
}