require('app-module-path').addPath(process.cwd());

const _ = require('lodash');
const Bluebird = require('bluebird');

const sequelize = require('src/database/sequelize');
const httpHelper = require('src/helpers/http');
const UserModel = require('src/models/User');

exports.helloWorld = (event, context, callback) => {
  httpHelper.createSuccessCallback(`Hello ${_.get(event.queryStringParameters, 'name', 'World')}!`, callback)
};

exports.createUser = async (event, context, callback) => {
  return Bluebird.resolve()
    .then(async () => {
      const body = JSON.parse(event.body);
      const db = sequelize();
      const User = UserModel(db);
      const user = await User.create(body);
      db.close();
      return httpHelper.createSuccessCallback(user, callback)
    })
    .catch(Error, httpHelper.createErrorCallback(callback));
}

exports.readUsers = async (event, context, callback) => {
  return Bluebird.resolve()
    .then(async () => {
      const db = sequelize();
      const User = UserModel(db);
      const users = await User.findAll();
      db.close();
      return httpHelper.createSuccessCallback(users, callback)
    })
    .catch(Error, httpHelper.createErrorCallback(callback));
}

exports.readUserById = async (event, context, callback) => {
  return Bluebird.resolve()
    .then(async () => {
      const id = event.pathParameters.id;
      const db = sequelize();
      const User = UserModel(db);
      const user = await User.findOne({
        where: { id }
      });
      db.close();
      return httpHelper.createSuccessCallback(user, callback)
    })
    .catch(Error, httpHelper.createErrorCallback(callback));
}

exports.updateUser = async (event, context, callback) => {
  return Bluebird.resolve()
    .then(async () => {
      const id = event.pathParameters.id;
      const body = JSON.parse(event.body);
      const db = sequelize();
      const User = UserModel(db);
      const user = await User.update(body,
        { where: { id } }
      );
      db.close();
      return httpHelper.createSuccessCallback(user, callback)
    })
    .catch(Error, httpHelper.createErrorCallback(callback));
}

exports.deleteUser = async (event, context, callback) => {
  return Bluebird.resolve()
    .then(async () => {
      const id = event.pathParameters.id;
      const db = sequelize();
      const User = UserModel(db);
      const user = await User.destroy({
        where: { id }
      });
      db.close();
      return httpHelper.createSuccessCallback(user, callback)
    })
    .catch(Error, httpHelper.createErrorCallback(callback));
}
