const multer = require('multer');
const path = require('path');

// const inMemoryStorage = multer.memoryStorage();
const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, '../temp/images'),
  filename: (request, file, callback) => {
    callback(null, Date.now() + file.originalname);
  }
})

const uploadStrategy = multer({ storage: diskstorage }).single('image');

module.exports = { uploadStrategy };
