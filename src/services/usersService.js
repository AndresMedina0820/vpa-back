const { models } = require('../libs/sequelize_connection');
const { Sequelize } = require('sequelize');
const boom = require('@hapi/boom');
const {
  getBlobName,
  blobService,
  deleteBlob,
} = require('../controllers/blobService');
const { deleteFileTemp } = require('../controllers/deleteFilesTemp');

class UsersService {
  constructor() {}

  async find({ limit = 5, offset = 0, keyword = '' }) {
    try {
      let count;
      let options = {
        where: {
          [Sequelize.Op.or]: [
            {
              name: { [Sequelize.Op.iLike]: `%${keyword}%` },
            },
            {
              lastName: { [Sequelize.Op.iLike]: `%${keyword}%` },
            },
          ],
        },
        include: ['type_id', 'role'],
        order: [['id', 'DESC']],
        limit: limit,
        offset: offset,
      };

      const users = await models.User.findAll(options);
      count = await models.User.count(keyword ? options : null);

      return { users: [...users], count: count };
    } catch (error) {
      throw boom.clientTimeout(`Conexión fallida: ${error}`);
    }
  }

  async findOne(id) {
    try {
      const user = await models.User.findByPk(id, {
        include: ['type_id', 'role'],
      });
      if (!user) {
        return boom.notFound('Usuario no encontrado');
      }

      return user;
    } catch (error) {
      throw boom.clientTimeout(
        `Conexión fallida: ${error?.original?.detail || error}`
      );
    }
  }

  async upload(file, id) {
    try {
      const containerName = 'profiles';
      const name = getBlobName(file.originalname);
      const path = file.path;
      let urlImage = '';
      const user = await this.findOne(id);
      console.log("Upload", user);

      if (user.picture) {
        console.log('ENTRREEEE');
        deleteBlob(user.picture, 'profiles');
      }

      blobService.createBlockBlobFromLocalFile(
        containerName,
        name,
        path,
        (err) => {
          if (err) {
            console.error(err);
            deleteFileTemp(path);
            throw boom.clientTimeout(
              `Error al guardar imagen: ${error?.original?.detail || error}`
            );
          }
        }
      );

      urlImage = blobService.getUrl(containerName, name);
      console.log('urlImage', urlImage);
      const data = await this.update(id, { picture: urlImage });
      if (data) {
        deleteFileTemp(path);
      }

      return urlImage;
    } catch (error) {
      throw boom.clientTimeout(
        `Error al guardar imagen: ${error?.original?.detail || error}`
      );
    }
  }

  async create(data) {
    try {
      const response = await models.User.create(data);
      return response;
    } catch (error) {
      throw boom.failedDependency(
        `Creación fallida:  ${error?.original?.detail || error}`
      );
    }
  }

  async update(id, changes) {
    try {
      const user = await this.findOne(id);
      await user.update(changes);
      return user;
    } catch (error) {
      throw boom.badRequest(
        `Actualización fallida: ${error?.original?.detail || error}`
      );
    }
  }

  async delete(id) {
    try {
      const user = await this.findOne(id);
      const { picture } = user;
      if (deleteBlob(picture, 'profiles')) {
        await user.destroy();
        return { id };
      }

    } catch (error) {
      throw boom.badRequest(
        `Eliminación fallida: ${error?.original?.detail || error}`
      );
    }
  }
}

module.exports = UsersService;
