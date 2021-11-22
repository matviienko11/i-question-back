const path = require('path');

import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

export const STORAGE = {
  storage: diskStorage(({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extention: string = path.parse(file.originalname).ext;
      cb(null, `${ filename }${ extention }`);
    }
  }))
};
