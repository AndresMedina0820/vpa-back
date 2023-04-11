const fs = require('fs');

deleteFileTemp = async (path) => {
  fs.unlink(path, function (err) {
    if (err) {
      console.log('Error al borrar archivo temporal:', err);
      return false;
    } else {
      console.log('Archivo temporal eliminado');
      return true;
    }
  });
};

module.exports = { deleteFileTemp };
