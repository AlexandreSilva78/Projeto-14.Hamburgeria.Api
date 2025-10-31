const multer = require('multer');
const { resolve } = require('node:path');
const { v4 } = require('uuid');

module.exports = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'), // path.resolve
    filename: (_request, file, callback) => {
      const uniqueName = v4().concat(`-${file.originalname}`); //Talvez seja aspas '-${file.originalname}'
      return callback(null, uniqueName);
    },
  }),
};
