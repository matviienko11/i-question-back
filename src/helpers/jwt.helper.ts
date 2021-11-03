const jwt = require('jsonwebtoken');

export class JwtHelper {
  
  async assignToken(user): Promise<{ token: string }> {
    const token = await jwt.sign({ data: user }, process.env.JWT_SECRET);
    return { token };
  }
  
  async verifyToken(token) {
    return await jwt.verify(token, process.env.JWT_SECRET);
  }
}