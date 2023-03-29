const azureStorage = require('azure-storage');

const blobService = azureStorage.createBlobService(); // Trae la variable del .env y se conecta con los servicios de Azure

const getBlobName = (originalName) => {
  const identifier = Math.random().toString().replace(/0\./, ''); // Quita el 0. del inicio
  return `${identifier}-${originalName}`;
};

const deleteBlob = (pictureUrl, containerName) => {
  const index = pictureUrl.indexOf(`${containerName}/`) + 9;
  const nameImage = pictureUrl.substring(index);
  console.log('nameImage======', nameImage);

  blobService.deleteBlobIfExists(containerName, nameImage, (err) => {
    if (err) {
      console.error(err);
      throw boom.clientTimeout(`Error al eliminar imagen`);
    }
  });

  return true;
};

module.exports = { blobService, getBlobName, deleteBlob };
