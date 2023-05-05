const boom = require('@hapi/boom');
const fs = require('fs');

deleteFileTemp = async (path) => {
  fs.unlink(path, function (err) {
    if (err) {
      console.log('Error al borrar archivo temporal:', err);
      return false;
    } else {
      return true;
    }
  });
};

module.exports = { deleteFileTemp };
