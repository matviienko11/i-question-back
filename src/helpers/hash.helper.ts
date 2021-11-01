const bcrypt = require('bcrypt');

export class HashHelper {
  
  async hashedPassword(password): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  
  async compareHashes(purePass, hashedPass): Promise<boolean> {
    return await bcrypt.compare(purePass, hashedPass);
  }
}

